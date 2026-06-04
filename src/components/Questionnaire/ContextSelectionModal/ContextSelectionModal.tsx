import React from "react";
import { Modal } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import SearchableTable from "../../SearchableTable";

export interface ContextSelectionModalProps {
    show: boolean;
    title?: string;
    serverUrl: string;
    resourceType: string;
    onSelect: (reference: string) => void;
    onCancel: () => void;
    onError: () => void;
}

const ContextSelectionModal: React.FC<ContextSelectionModalProps> = (props) => {
    return (
        <Modal show={props.show} onHide={props.onCancel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title ?? `Sélectionner ${props.resourceType}`}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <SearchableTable
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
                            {
                                label: "Nom",
                                type: "text",
                                searchParamsName: "name",
                            },
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
                                header: "Nom",
                                dataField: "name",
                                width: "60%",
                            },
                        ],
                        action: [
                            {
                                icon: faCheck,
                                onClick: (id: string) => {
                                    props.onSelect(`${props.resourceType}/${id}`);
                                },
                            },
                        ],
                        mapResourceToData: (resource: any) => ({
                            id: resource.id,
                            name:
                                resource.name?.[0]?.text ??
                                resource.name?.[0]?.family ??
                                resource.name ??
                                resource.title ??
                                resource.description ??
                                "",
                        }),
                        searchProperties: {
                            serverUrl: props.serverUrl,
                            resourceType: props.resourceType,
                        },
                        onError: props.onError,
                    }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ContextSelectionModal;