import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Questionnaire, QuestionnaireResponse } from "fhir/r5";
import SearchableTable from "../../SearchableTable";

export interface ContextSelectionModalProps {
    show: boolean;
    title?: string;
    serverUrl: string;
    resourceTypes: string[];
    onSelect: (reference: string, label: string) => void;
    onCancel: () => void;
    onError: () => void;
}

export type ContextResolution =
    | { type: "none" }
    | { type: "single"; reference: string; label: string }
    | { type: "multiple" };

const getDisplayLabel = (resourceType: string, resource: any): string => {
    switch (resourceType) {
        case "Patient":
            return Array.isArray(resource.name)
                ? resource.name
                    .map((name: any) =>
                        [
                            ...(name.given ?? []),
                            name.family,
                            name.text,
                        ]
                            .filter(Boolean)
                            .join(" ")
                    )
                    .filter(Boolean)
                    .join(", ") || resource.id
                : resource.id;

        case "Organization":
            return resource.name ?? resource.title ?? resource.description ?? resource.id;

        default:
            return resource.title ?? resource.name ?? resource.description ?? resource.id;
    }
};

export const getContextQuestionLinkIdsFromQuestionnaire = (
    items: Questionnaire["item"] = [],
    contextReference: string
): Set<string> => {
    const linkIds = new Set<string>();

    items.forEach((item) => {
        if (
            item.answerOption?.some(
                (answerOption: any) =>
                    answerOption.valueReference?.reference === contextReference
            )
        ) {
            linkIds.add(item.linkId);
        }

        getContextQuestionLinkIdsFromQuestionnaire(item.item, contextReference)
            .forEach((linkId) => linkIds.add(linkId));
    });

    return linkIds;
};

export const getContextQuestionLinkIdsFromQuestionnaireResponse = (
    items: QuestionnaireResponse["item"] = [],
    contextReference: string
): Set<string> => {
    const linkIds = new Set<string>();

    items.forEach((item) => {
        if (
            item.answer?.some(
                (answer: any) =>
                    answer.valueReference?.reference === contextReference
            )
        ) {
            linkIds.add(item.linkId);
        }

        getContextQuestionLinkIdsFromQuestionnaireResponse(item.item, contextReference)
            .forEach((linkId) => linkIds.add(linkId));
    });

    return linkIds;
};

export const removeItemsByLinkIdsFromQuestionnaire = (
    items: Questionnaire["item"] = [],
    linkIdsToRemove: Set<string>
): Questionnaire["item"] => {
    return items
        .filter((item) => !linkIdsToRemove.has(item.linkId))
        .map((item) => ({
            ...item,
            item: removeItemsByLinkIdsFromQuestionnaire(item.item, linkIdsToRemove),
        }));
};

export const removeItemsByLinkIdsFromQuestionnaireResponse = (
    items: QuestionnaireResponse["item"] = [],
    linkIdsToRemove: Set<string>
): QuestionnaireResponse["item"] => {
    return items
        .filter((item) => !linkIdsToRemove.has(item.linkId))
        .map((item) => ({
            ...item,
            item: removeItemsByLinkIdsFromQuestionnaireResponse(item.item, linkIdsToRemove),
        }));
};

export const getContextQuestionLinkIds = (
    questionnaireToUse: Questionnaire,
    responseToUse: QuestionnaireResponse,
    contextReference: string
): Set<string> => {
    const linkIds = new Set<string>();

    getContextQuestionLinkIdsFromQuestionnaire(questionnaireToUse.item, contextReference)
        .forEach((linkId) => linkIds.add(linkId));

    getContextQuestionLinkIdsFromQuestionnaireResponse(responseToUse.item, contextReference)
        .forEach((linkId) => linkIds.add(linkId));

    return linkIds;
};

export const removeContextQuestionFromQuestionnaire = (
    questionnaireToFilter: Questionnaire,
    linkIdsToRemove: Set<string>
): Questionnaire => ({
    ...questionnaireToFilter,
    item: removeItemsByLinkIdsFromQuestionnaire(
        questionnaireToFilter.item,
        linkIdsToRemove
    ),
});

export const removeContextQuestionFromQuestionnaireResponse = (
    responseToFilter: QuestionnaireResponse,
    linkIdsToRemove: Set<string>
): QuestionnaireResponse => ({
    ...responseToFilter,
    item: removeItemsByLinkIdsFromQuestionnaireResponse(
        responseToFilter.item,
        linkIdsToRemove
    ),
});

export const resolveQuestionnaireContext = async (
    fhirClient: any,
    resourceTypes: string[],
): Promise<ContextResolution> => {
    const options: { reference: string; label: string }[] = [];

    for (const resourceType of resourceTypes) {
        const searchResponse = await fhirClient.search({
            resourceType,
            searchParams: { _count: 2 },
        });

        const entries = searchResponse.entry ?? [];

        entries.slice(0, 2).forEach((entry: any) => {
            const resource = entry.resource;

            if (!resource?.id) {
                return;
            }

            options.push({
                reference: `${resourceType}/${resource.id}`,
                label: getDisplayLabel(resourceType, resource),
            });
        });
    }

    if (options.length === 0) {
        return { type: "none" };
    }

    if (options.length === 1) {
        return {
            type: "single",
            reference: options[0].reference,
            label: options[0].label,
        };
    }

    return { type: "multiple" };
};

const ContextSelectionModal: React.FC<ContextSelectionModalProps> = (props) => {
    const [selectedResourceType, setSelectedResourceType] = useState(
        props.resourceTypes[0] ?? "Patient"
    );

    const supportsNameSearch =
        selectedResourceType === "Patient" || selectedResourceType === "Organization";

    return (
        <Modal show={props.show} onHide={props.onCancel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title ?? `Sélectionner ${selectedResourceType}`}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Type :</label>
                        <select
                            className="form-select"
                            value={selectedResourceType}
                            disabled={props.resourceTypes.length === 1}
                            onChange={(event) => setSelectedResourceType(event.target.value)}
                        >
                            {props.resourceTypes.map((resourceType) => (
                                <option key={resourceType} value={resourceType}>
                                    {resourceType}
                                </option>
                            ))}
                        </select>
                    </div>

                <SearchableTable
                    key={selectedResourceType}
                    searchCriteriaProperties={{
                        title: "Recherche",
                        submitButtonLabel: "Rechercher",
                        resetButtonLabel: "Réinitialiser",
                        inputs: [
                            {
                                label: "Identifiant",
                                type: "text",
                                searchParamsName: "_id",
                            },
                            ...(supportsNameSearch
                                ? [
                                    {
                                        label: "Nom",
                                        type: "text",
                                        searchParamsName: "name",
                                    },
                                ]
                                : []),
                        ],
                    }}
                    paginatedTableProperties={{
                        columns: [
                            {
                                header: "ID",
                                dataField: "id",
                                width: "30%",
                            },
                            {
                                header: "Libellé",
                                dataField: "label",
                                width: "40%",
                            },
                        ],
                        action: [
                            {
                                icon: faCheck,
                                onClick: (id: string, event: any, item?: any) => {
                                    props.onSelect(
                                        `${selectedResourceType}/${id}`,
                                        item?.label ?? id
                                    );
                                },
                            },
                        ],
                        mapResourceToData: (resource: any) => ({
                            id: resource.id,
                            label: getDisplayLabel(selectedResourceType, resource),
                        }),
                        searchProperties: {
                            serverUrl: props.serverUrl,
                            resourceType: selectedResourceType,
                        },
                        onError: props.onError,
                    }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ContextSelectionModal;