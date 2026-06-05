import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import SearchableTable from "../../SearchableTable";

export interface ContextSelectionModalProps {
    show: boolean;
    title?: string;
    serverUrl: string;
    resourceTypes: string[];
    onSelect: (reference: string) => void;
    onCancel: () => void;
    onError: () => void;
}

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
                    .join(", ")
                : resource.id;

        case "Organization":
            return resource.name ?? resource.title ?? resource.description ?? resource.id;

        default:
            return resource.title ?? resource.name ?? resource.description ?? resource.id;
    }
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
                {props.resourceTypes.length > 1 && (
                    <div className="mb-3">
                        <label className="form-label">Type :</label>
                        <select
                            className="form-select"
                            value={selectedResourceType}
                            onChange={(event) => setSelectedResourceType(event.target.value)}
                        >
                            {props.resourceTypes.map((resourceType) => (
                                <option key={resourceType} value={resourceType}>
                                    {resourceType}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

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
                                onClick: (id: string) => {
                                    props.onSelect(`${selectedResourceType}/${id}`);
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