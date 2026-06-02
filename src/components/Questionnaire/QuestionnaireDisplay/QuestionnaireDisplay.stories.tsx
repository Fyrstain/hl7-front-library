// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// React
import React from "react";
// Component
import QuestionnaireDisplay, { QuestionnaireDisplayProps } from "./QuestionnaireDisplay";

// Used to define the story title in the storybook
interface StoryMeta extends Meta {
    component: React.FC<QuestionnaireDisplayProps>;
    title: string;
}

const meta: StoryMeta = {
    title: "Components/QuestionnaireDisplay",
    component: QuestionnaireDisplay,
};

export default meta;

const Template: StoryObj<QuestionnaireDisplayProps> = {
    render: (args) => <QuestionnaireDisplay {...args} />,
};

const qr = {
    "resourceType": "QuestionnaireResponse",
    "id": "117",
    "contained": [
        {
            "resourceType": "Questionnaire",
            "id": "Q-SV21",
            "meta": {
                "profile": [
                    "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-extr-defn"
                ]
            },
            "url": "http://hl7.eu/fhir/ig/flute/Questionnaire/Q-SV21",
            "version": "2.1.0",
            "name": "StudyVariableExtraction",
            "title": "Study variable Extraction 2.1.0",
            "status": "active",
            "experimental": true,
            "subjectType": ["Patient"],
            "date": "2025-10-22",
            "description": "Study variable extractable questionnaire",
            "item": [
                {
                    "linkId": "g-proc",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure",
                    "text": "Procedure Biopsy group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "type-of-biopsy",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.category.coding",
                            "text": "Type of biopsy",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerValueSet": "http://hl7.eu/fhir/ig/flute/ValueSet/VS-BiopsyType"
                        },
                        {
                            "linkId": "procedure-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.status",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "86273004"
                                }
                            ],
                            "text": "Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/event-status",
                                        "code": "completed"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "biopsy-date",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.performedDateTime",
                            "text": "Date when the biopsy was performed",
                            "type": "dateTime",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "biopsy",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.code.coding",
                            "text": "Biopsy",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "86273004",
                                        "display": "Biopsy"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "biopsy-bodySite",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.bodySite.coding",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "86273004"
                                }
                            ],
                            "text": "Biopsy bodySite",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "41216001",
                                        "display": "Prostatic structure (body structure)"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-fam-hist",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory",
                    "code": [
                        {
                            "system": "http://snomed.info/sct",
                            "code": "399068003"
                        }
                    ],
                    "text": "Family history group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "family-history-pca",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.condition.code.coding",
                            "text": "Family history of prostate cancer",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerValueSet": "http://hl7.eu/fhir/ig/flute/ValueSet/VS-PCa"
                        },
                        {
                            "linkId": "family-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.status",
                            "text": "Family Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/history-status",
                                        "code": "completed"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "family-relationship",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.relationship.coding",
                            "text": "Family relationship",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                                        "code": "FAMMEMB"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-obs-psa",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation",
                    "text": "Observation PSA group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "psa",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.value",
                            "code": [
                                {
                                    "system": "http://loinc.org",
                                    "code": "2857-1"
                                }
                            ],
                            "text": "Measure of prostate-specific antigen reported in ng/ml",
                            "type": "quantity",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "psa-code",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.code.coding",
                            "text": "PSA code",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://loinc.org",
                                        "code": "2857-1",
                                        "display": "Prostate specific Ag [Mass/volume] in Serum or Plasma"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "psa-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.status",
                            "code": [
                                {
                                    "system": "http://loinc.org",
                                    "code": "2857-1"
                                }
                            ],
                            "text": "PSA Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/observation-status",
                                        "code": "final"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-proc-dre",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure",
                    "text": "Procedure DRE group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "dre",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.outcome.coding",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "410006001"
                                }
                            ],
                            "text": "Results of digital rectal examination",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerValueSet": "http://hl7.eu/fhir/ig/flute/ValueSet/VS-DREOutcomeCode"
                        },
                        {
                            "linkId": "dre-code",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.code.coding",
                            "text": "DRE code",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "410006001",
                                        "display": "DRE - Digital rectal examination"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "dre-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.status",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "410006001"
                                }
                            ],
                            "text": "DRE Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/event-status",
                                        "code": "completed"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "dre-bodySite",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.bodySite.coding",
                            "text": "DRE bodySite",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "41216001",
                                        "display": "Prostate"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-obs-prost-vol",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation",
                    "text": "Observation Prostate Volume group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "prostate-volume",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.value",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "41216001"
                                }
                            ],
                            "text": "Prostate volume in cc",
                            "type": "quantity",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "prostate-code",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.code.coding",
                            "text": "Prostate volume code",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "1297142007",
                                        "display": "Volume of prostate"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "prostate-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.status",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "41216001"
                                }
                            ],
                            "text": "Prostate volume Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/observation-status",
                                        "code": "final"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "prostate-bodySite",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.bodySite.coding",
                            "text": "Prostate volume bodySite",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "41216001",
                                        "display": "Prostate"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-obs-pirads",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation",
                    "text": "Observation PI-RADS group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "pirads",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.valueCodeableConcept.coding",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "719178004"
                                }
                            ],
                            "text": "PI-RADS score",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "1",
                                        "display": "Very low"
                                    }
                                },
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "2",
                                        "display": "Low"
                                    }
                                },
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "3",
                                        "display": "Intermediate"
                                    }
                                },
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "4",
                                        "display": "High"
                                    }
                                },
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "5",
                                        "display": "Very high"
                                    }
                                }
                            ]
                        },
                        {
                            "linkId": "pirads-code",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.code.coding",
                            "text": "PI-RADS code",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "719178004",
                                        "display": "Multiparametric magnetic resonance imaging of prostate"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "pirads-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.status",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "719178004"
                                }
                            ],
                            "text": "PI-RADS Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/observation-status",
                                        "code": "final"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-imag",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy",
                    "text": "Imaging Study group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "study-id-system",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.identifier.system",
                            "text": "Study ID System",
                            "type": "url",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "study-id-value",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.identifier.value",
                            "text": "Study ID value",
                            "type": "string",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "imagingstudy-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.status",
                            "text": "Study Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/imagingstudy-status",
                                        "code": "available"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "imagingstudy-started",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.started",
                            "text": "Study Started DateTime",
                            "type": "dateTime",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "imagingstudy-endpoint",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.endpoint.display",
                            "text": "Study DICOM URL Endpoint",
                            "type": "string",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "g-imaging-series",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series",
                            "text": "Imaging Study Series group",
                            "type": "group",
                            "required": false,
                            "repeats": true,
                            "item": [
                                {
                                    "linkId": "imagingstudy-series-uid",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[+].uid",
                                    "text": "Study Series UID",
                                    "type": "string",
                                    "required": true,
                                    "repeats": false
                                },
                                {
                                    "linkId": "imagingstudy-series-modality",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].modality",
                                    "text": "Study Series Modality",
                                    "type": "choice",
                                    "required": true,
                                    "repeats": false,
                                    "answerValueSet": "http://dicom.nema.org/medical/dicom/current/output/chtml/part16/sect_CID_29.html"
                                },
                                {
                                    "linkId": "g-imaging-instance",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.instance",
                                    "text": "Imaging Study Instance group",
                                    "type": "group",
                                    "required": false,
                                    "repeats": true,
                                    "item": [
                                        {
                                            "linkId": "imagingstudy-instance-uid",
                                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[+].uid",
                                            "text": "Study instance UID",
                                            "type": "string",
                                            "required": true,
                                            "repeats": false
                                        },
                                        {
                                            "linkId": "imagingstudy-instance-class",
                                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[=].sopClass",
                                            "text": "Study instance SOP Class",
                                            "type": "choice",
                                            "required": true,
                                            "repeats": false,
                                            "answerValueSet": "http://hl7.eu/fhir/ig/flute/ValueSet/VS-SOPClass"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "linkId": "imagingstudy-note",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.note.text",
                            "text": "Any metadata relevant to filter the dataset before ML training",
                            "type": "string",
                            "required": false,
                            "repeats": false
                        }
                    ]
                }
            ]
        }
    ],
    "questionnaire": "#Q-SV21",
    "status": "in-progress",
    "subject": {
        "reference": "Patient/patient-1"
    },
    "item": [
        {
            "linkId": "g-proc",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure",
            "text": "Procedure Biopsy group",
            "item": [
                {
                    "linkId": "type-of-biopsy",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.category.coding",
                    "text": "Type of biopsy",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "27582007"
                            }
                        }
                    ]
                },
                {
                    "linkId": "procedure-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.status",
                    "text": "Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/event-status",
                                "code": "completed"
                            }
                        }
                    ]
                },
                {
                    "linkId": "biopsy-date",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.performedDateTime",
                    "text": "Date when the biopsy was performed",
                    "answer": [
                        {
                            "valueDateTime": "2000-02-10T10:00:00Z"
                        }
                    ]
                },
                {
                    "linkId": "biopsy",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.code.coding",
                    "text": "Biopsy",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "86273004"
                            }
                        }
                    ]
                },
                {
                    "linkId": "biopsy-bodySite",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.bodySite.coding",
                    "text": "Biopsy bodySite",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "41216001"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-fam-hist",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory",
            "text": "Family history group",
            "item": [
                {
                    "linkId": "family-history-pca",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.condition.code.coding",
                    "text": "Family history of prostate cancer",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "715412008"
                            }
                        }
                    ]
                },
                {
                    "linkId": "family-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.status",
                    "text": "Family Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/history-status",
                                "code": "completed"
                            }
                        }
                    ]
                },
                {
                    "linkId": "family-relationship",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.relationship.coding",
                    "text": "Family relationship",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                                "code": "FAMMEMB"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-obs-psa",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation",
            "text": "Observation PSA group",
            "item": [
                {
                    "linkId": "psa",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.value",
                    "text": "Measure of prostate-specific antigen reported in ng/ml",
                    "answer": [
                        {
                            "valueQuantity": {
                                "value": 10,
                                "unit": "ng/ml"
                            }
                        }
                    ]
                },
                {
                    "linkId": "psa-code",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.code.coding",
                    "text": "PSA code",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://loinc.org",
                                "code": "2857-1"
                            }
                        }
                    ]
                },
                {
                    "linkId": "psa-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.status",
                    "text": "PSA Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/observation-status",
                                "code": "final"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-proc-dre",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure",
            "text": "Procedure DRE group",
            "item": [
                {
                    "linkId": "dre",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.outcome.coding",
                    "text": "Results of digital rectal examination",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "131196009"
                            }
                        }
                    ]
                },
                {
                    "linkId": "dre-code",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.code.coding",
                    "text": "DRE code",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "410006001"
                            }
                        }
                    ]
                },
                {
                    "linkId": "dre-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.status",
                    "text": "DRE Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/event-status",
                                "code": "completed"
                            }
                        }
                    ]
                },
                {
                    "linkId": "dre-bodySite",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.bodySite.coding",
                    "text": "DRE bodySite",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "41216001"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-obs-prost-vol",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation",
            "text": "Observation Prostate Volume group",
            "item": [
                {
                    "linkId": "prostate-volume",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.value",
                    "text": "Prostate volume in cc",
                    "answer": [
                        {
                            "valueQuantity": {
                                "value": 10,
                                "unit": "cc"
                            }
                        }
                    ]
                },
                {
                    "linkId": "prostate-code",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.code.coding",
                    "text": "Prostate volume code",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "1297142007"
                            }
                        }
                    ]
                },
                {
                    "linkId": "prostate-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.status",
                    "text": "Prostate volume Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/observation-status",
                                "code": "final"
                            }
                        }
                    ]
                },
                {
                    "linkId": "prostate-bodySite",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.bodySite.coding",
                    "text": "Prostate volume bodySite",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "41216001"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-obs-pirads",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation",
            "text": "Observation PI-RADS group",
            "item": [
                {
                    "linkId": "pirads",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.valueCodeableConcept.coding",
                    "text": "PI-RADS score",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                "code": "3"
                            }
                        }
                    ]
                },
                {
                    "linkId": "pirads-code",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.code.coding",
                    "text": "PI-RADS code",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "719178004"
                            }
                        }
                    ]
                },
                {
                    "linkId": "pirads-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.status",
                    "text": "PI-RADS Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/observation-status",
                                "code": "final"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-imag",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy",
            "text": "Imaging Study group",
            "item": [
                {
                    "linkId": "study-id-system",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.identifier.system",
                    "text": "Study ID System",
                    "answer": [
                        {
                            "valueUri": "urn:dicom:uid"
                        }
                    ]
                },
                {
                    "linkId": "study-id-value",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.identifier.value",
                    "text": "Study ID value",
                    "answer": [
                        {
                            "valueString": "ad1d247b-6e0a0a02-98880beb-460a2261-d25594b2"
                        }
                    ]
                },
                {
                    "linkId": "imagingstudy-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.status",
                    "text": "Study Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/imagingstudy-status",
                                "code": "available"
                            }
                        }
                    ]
                },
                {
                    "linkId": "imagingstudy-started",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.started",
                    "text": "Study Started DateTime",
                    "answer": [
                        {
                            "valueDateTime": "2000-02-10T10:00:00Z"
                        }
                    ]
                },
                {
                    "linkId": "imagingstudy-endpoint",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.endpoint.display",
                    "text": "Study DICOM URL Endpoint",
                    "answer": [
                        {
                            "valueString": "http://141.94.211.20:8042"
                        }
                    ]
                },
                {
                    "linkId": "g-imaging-series",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series",
                    "text": "Imaging Study Series group",
                    "item": [
                        {
                            "linkId": "imagingstudy-series-uid",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[+].uid",
                            "text": "Study Series UID",
                            "answer": [
                                {
                                    "valueString": "123"
                                }
                            ]
                        },
                        {
                            "linkId": "imagingstudy-series-modality",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].modality",
                            "text": "Study Series Modality",
                            "answer": [
                                {
                                    "valueCoding": {
                                        "system": "http://dicom.nema.org/resources/ontology/DCM",
                                        "code": "PA"
                                    }
                                }
                            ]
                        },
                        {
                            "linkId": "g-imaging-instance",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.instance",
                            "text": "Imaging Study Instance group",
                            "item": [
                                {
                                    "linkId": "imagingstudy-instance-uid",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[+].uid",
                                    "text": "Study instance UID",
                                    "answer": [
                                        {
                                            "valueString": "456"
                                        }
                                    ]
                                },
                                {
                                    "linkId": "imagingstudy-instance-class",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[=].sopClass",
                                    "text": "Study instance SOP Class",
                                    "answer": [
                                        {
                                            "valueCoding": {
                                                "system": "urn:ietf:rfc:3986",
                                                "code": "urn:oid:1.2.840.10008.5.1.4.1.1.4.4"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "linkId": "g-imaging-instance",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.instance",
                            "text": "Imaging Study Instance group",
                            "item": [
                                {
                                    "linkId": "imagingstudy-instance-uid",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[+].uid",
                                    "text": "Study instance UID",
                                    "answer": [
                                        {
                                            "valueString": "789"
                                        }
                                    ]
                                },
                                {
                                    "linkId": "imagingstudy-instance-class",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[=].sopClass",
                                    "text": "Study instance SOP Class",
                                    "answer": [
                                        {
                                            "valueCoding": {
                                                "system": "urn:ietf:rfc:3986",
                                                "code": "urn:oid:1.2.840.10008.5.1.4.1.1.4.4"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "imagingstudy-note",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.note.text",
                    "text": "Any metadata relevant to filter the dataset before ML training"
                },
                {
                    "linkId": "g-imaging-series",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series",
                    "text": "Imaging Study Series group",
                    "item": [
                        {
                            "linkId": "imagingstudy-series-uid",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[+].uid",
                            "text": "Study Series UID",
                            "answer": [
                                {
                                    "valueString": "321"
                                }
                            ]
                        },
                        {
                            "linkId": "imagingstudy-series-modality",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].modality",
                            "text": "Study Series Modality",
                            "answer": [
                                {
                                    "valueCoding": {
                                        "system": "http://dicom.nema.org/resources/ontology/DCM",
                                        "code": "PA"
                                    }
                                }
                            ]
                        },
                        {
                            "linkId": "g-imaging-instance",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.instance",
                            "text": "Imaging Study Instance group",
                            "item": [
                                {
                                    "linkId": "imagingstudy-instance-uid",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[+].uid",
                                    "text": "Study instance UID",
                                    "answer": [
                                        {
                                            "valueString": "654"
                                        }
                                    ]
                                },
                                {
                                    "linkId": "imagingstudy-instance-class",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[=].sopClass",
                                    "text": "Study instance SOP Class",
                                    "answer": [
                                        {
                                            "valueCoding": {
                                                "system": "urn:ietf:rfc:3986",
                                                "code": "urn:oid:1.2.840.10008.5.1.4.1.1.4.4"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "author": {
        "identifier": {
            "value": "john.doe@gmail.com"
        }
    },
    "meta": {
        "lastUpdated": "2026-02-09T15:36:07Z",
        "versionId": "1"
    }
}

const questionnaire = (qr as any).contained?.[0];

const valueSetLoaderMock = {
  searchValueSet: async (url: string) => {
    const u = (url ?? "").toLowerCase();
    
    if (u.includes("vs-biopsytype")) {
      return [
        { system: "http://snomed.info/sct", code: "27582007", display: "Prostate biopsy" },
        { system: "http://snomed.info/sct", code: "86273004", display: "Biopsy" },
        { system: "http://snomed.info/sct", code: "274214007", display: "Needle biopsy" },
      ];
    }

    if (u.includes("vs-pca")) {
      return [
        { system: "http://snomed.info/sct", code: "715412008", display: "Prostate cancer (disorder)" },
        { system: "http://snomed.info/sct", code: "399068003", display: "Family history of malignant neoplasm of prostate" },
        { system: "http://snomed.info/sct", code: "260385009", display: "Negative" },
      ];
    }

    if (u.includes("vs-dreoutcomecode")) {
      return [
        { system: "http://snomed.info/sct", code: "131196009", display: "Abnormal digital rectal examination" },
        { system: "http://snomed.info/sct", code: "17621005", display: "Normal" },
        { system: "http://snomed.info/sct", code: "260385009", display: "Negative" },
      ];
    }

    if (u.includes("dicom.nema.org") && u.includes("cid_29")) {
      return [
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "PA", display: "Photoacoustic" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "MR", display: "Magnetic Resonance" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "CT", display: "Computed Tomography" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "US", display: "Ultrasound" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "CR", display: "Computed Radiography" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "DX", display: "Digital Radiography" },
      ];
    }

    if (u.includes("vs-sopclass")) {
      return [
        {
          system: "urn:ietf:rfc:3986",
          code: "urn:oid:1.2.840.10008.5.1.4.1.1.4.4",
          display: "MR Spectroscopy Storage",
        },
        {
          system: "urn:ietf:rfc:3986",
          code: "urn:oid:1.2.840.10008.5.1.4.1.1.2",
          display: "CT Image Storage",
        },
        {
          system: "urn:ietf:rfc:3986",
          code: "urn:oid:1.2.840.10008.5.1.4.1.1.4",
          display: "MR Image Storage",
        },
      ];
    }

    return [];
  },
  toCodeableConcept: (coding: any) => ({ coding: [coding] }),
} as any;


export const Default: StoryObj<QuestionnaireDisplayProps> = {
    ...Template,
    args: {
        questionnaire,
        questionnaireResponse: qr as any,
        valueSetLoader: valueSetLoaderMock,
        onSubmit: (response) => console.log("Submitted response:", JSON.stringify(response, null, 2)),
        onError: () => console.error("Error"),
    },
};

export const ReadOnly: StoryObj<QuestionnaireDisplayProps> = {
    ...Template,
    args: {
        questionnaire,
        questionnaireResponse: qr as any,
        valueSetLoader: valueSetLoaderMock,
        readOnly: true,
        onSubmit: (response) => console.log("Submitted response:", JSON.stringify(response, null, 2)),
        onError: () => console.error("Error"),
    },
};

export const WithCustomLabels: StoryObj<QuestionnaireDisplayProps> = {
    ...Template,
    args: {
        questionnaire,
        questionnaireResponse: qr as any,
        valueSetLoader: valueSetLoaderMock,
        submitButtonLabel: "Enregistrer",
        resetButtonLabel: "Réinitialiser",
        onSubmit: (response) => console.log("Submitted response:", JSON.stringify(response, null, 2)),
        onError: () => console.error("Error"),
    },
};
const qrChru = {
    "resourceType": "QuestionnaireResponse",
    "id": "1044",
    "meta": {
        "versionId": "1",
        "lastUpdated": "2026-06-02T07:48:01.619+00:00"
    },
    "contained": [ {
        "resourceType": "Questionnaire",
        "id": "Questionnaire-UpCare",
        "language": "fr-FR",
        "url": "http://chun.upcare.fr/fhir/Questionnaire/Questionnaire-UpCare",
        "version": "0.1.0",
        "name": "QuestionnaireUpCare",
        "title": "CHRU Questionnaire de Satisfaction projet Up Care",
        "status": "draft",
        "subjectType": [ "Patient" ],
        "date": "2026-05-13T16:20:30+02:00",
        "publisher": "CHUN",
        "contact": [ {
        "name": "CHUN",
        "telecom": [ {
            "system": "url",
            "value": "http://chun.upcare.fr"
        } ]
        } ],
        "description": "Questionnaire de satisfaction du projet Up Care.",
        "item": [ {
        "linkId": "2344e4b2-f5eb-4f54-88fa-51686a47f261",
        "text": "Ce questionnaire aborde diffÃÂ©rents aspects de votre vie il vous est demandÃÂ© dÃ¢ÂÂÃÂ©valuer votre satisfaction. Il se compose dÃ¢ÂÂune sÃÂ©rie dÃ¢ÂÂÃÂ©noncÃÂ©s pour lesquels vous devez indiquer votre position sur une ÃÂ©chelle de satisfaction composÃÂ©e de 6 modalitÃÂ©s ÃÂ« pas du tout satisfait ÃÂ» ÃÂ  ÃÂ« tout ÃÂ  fait satisfait ÃÂ»\nSoyez spontanÃÂ© et sincÃÂ¨re dans vos rÃÂ©ponses.\nCe questionnaire est anonyme, confidentiel et aucune rÃÂ©ponse individuelle ne sera communiquÃÂ©e.",
        "type": "display"
        }, {
        "linkId": "05e5342c-4745-46e5-898b-9de7f6345085",
        "text": "Informations gÃÂ©nÃÂ©rales",
        "type": "group",
        "required": true,
        "item": [ {
            "extension": [ {
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
            "valueCodeableConcept": {
                "coding": [ {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "radio-button"
                } ]
            }
            } ],
            "linkId": "aee11f5c-d4fa-4e78-8fe7-9a23ef692434",
            "text": "Vous ÃÂªtes",
            "type": "choice",
            "required": true,
            "answerOption": [ {
            "valueString": "Une femme"
            }, {
            "valueString": "Un homme"
            } ]
        }, {
            "extension": [ {
            "url": "http://hl7.org/fhir/StructureDefinition/minValue",
            "valueInteger": 0
            }, {
            "url": "http://hl7.org/fhir/StructureDefinition/maxValue",
            "valueInteger": 120
            } ],
            "linkId": "87d0898a-eb83-43bc-83e0-3705536413b2",
            "text": "Votre ÃÂ¢ge",
            "type": "integer",
            "required": true
        }, {
            "linkId": "7b1d0342-56d9-4011-ac62-e9466bb0e872",
            "text": "Votre date d'arrivÃÂ©e dans le service",
            "type": "date",
            "required": true
        }, {
            "extension": [ {
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
            "valueCodeableConcept": {
                "coding": [ {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down"
                } ]
            }
            } ],
            "linkId": "c4a48ada-a01a-4d39-a067-ea3e99d5035c",
            "text": "Votre fonction",
            "type": "choice",
            "required": true,
            "answerOption": [ {
            "valueString": "ASH"
            }, {
            "valueString": "AS"
            }, {
            "valueString": "IDE"
            } ]
        }, {
            "extension": [ {
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
            "valueCodeableConcept": {
                "coding": [ {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down"
                } ]
            }
            } ],
            "linkId": "12093d97-a28d-452b-8fd3-6d6bf4527cfe",
            "text": "Votre service",
            "type": "choice",
            "required": true,
            "answerOption": [ {
            "valueReference": {
                "reference": "Organization/UCA-CENTRAL",
                "display": "UCA CENTRAL"
            }
            }, {
            "valueReference": {
                "reference": "Organization/UCA-MATERNITE",
                "display": "UCA MATERNITE"
            }
            } ]
        } ]
        }, {
        "linkId": "de1f4934-cc25-4fd3-9e92-15057c488379",
        "text": "Questionnaire",
        "type": "group",
        "required": true,
        "item": [ {
            "linkId": "429b294f-66f8-4d5a-d42d-b9955d1d9b66",
            "text": "A. Organisation et contenu du travail",
            "type": "group",
            "required": true,
            "item": [ {
            "extension": [ {
                "url": "http://hl7.org/fhir/StructureDefinition/variable",
                "valueExpression": {
                "name": "qA",
                "language": "text/fhirpath",
                "expression": "%resource.repeat(item).where(linkId='59a247f8-578f-4c31-8f7c-8d08b0b552fb').answer.valueCoding.code"
                }
            } ],
            "linkId": "59a247f8-578f-4c31-8f7c-8d08b0b552fb",
            "text": "La maniÃÂ¨re dont le travail est organisÃÂ© dans mon service",
            "type": "choice",
            "required": true,
            "answerOption": [ {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "0",
                "display": "Pas du tout satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "1",
                "display": "Pas satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "2",
                "display": "Assez peu satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "3",
                "display": "Assez satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "4",
                "display": "Satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "5",
                "display": "Tout ÃÂ  fait satisfait"
                }
            } ]
            } ]
        }, {
            "linkId": "75c01161-9998-4212-82d0-58889ad89829",
            "text": "B. Relation entre personnel",
            "type": "group",
            "required": true,
            "item": [ {
            "extension": [ {
                "url": "http://hl7.org/fhir/StructureDefinition/variable",
                "valueExpression": {
                "name": "qB",
                "language": "text/fhirpath",
                "expression": "%resource.repeat(item).where(linkId='bfdc7394-7de1-4052-8652-de260795dc46').answer.valueCoding.code"
                }
            } ],
            "linkId": "bfdc7394-7de1-4052-8652-de260795dc46",
            "text": "Les relations humaines entre professionnels dans le service",
            "type": "choice",
            "required": true,
            "answerOption": [ {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "0",
                "display": "Pas du tout satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "1",
                "display": "Pas satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "2",
                "display": "Assez peu satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "3",
                "display": "Assez satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "4",
                "display": "Satisfait"
                }
            }, {
                "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "5",
                "display": "Tout ÃÂ  fait satisfait"
                }
            } ]
            } ]
        } ]
        }, {
        "extension": [ {
            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-definitionExtractValue",
            "extension": [ {
            "url": "definition",
            "valueUri": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.effective"
            }, {
            "url": "expression",
            "valueExpression": {
                "language": "text/fhirpath",
                "expression": "(%resource.authored | %resource.meta.lastUpdated | now()).first()"
            }
            } ]
        }, {
            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-definitionExtractValue",
            "extension": [ {
            "url": "definition",
            "valueUri": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.focus"
            }, {
            "url": "expression",
            "valueExpression": {
                "language": "text/fhirpath",
                "expression": "%resource.repeat(item).where(linkId='12093d97-a28d-452b-8fd3-6d6bf4527cfe').answer.value"
            }
            } ]
        } ],
        "linkId": "resultats-observation",
        "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation",
        "text": "RÃÂ©sultats calculÃÂ©s",
        "type": "group",
        "readOnly": true,
        "item": [ {
            "extension": [ {
            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
            "valueExpression": {
                "language": "text/fhirpath",
                "expression": "(%qA.first().toDecimal() | %qB.first().toDecimal()).avg()"
            }
            } ],
            "linkId": "score_moyen",
            "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.valueQuantity.value",
            "code": [ {
            "system": "http://chun.upcare.fr/fhir/CodeSystem/upcare-observation-cs",
            "code": "score-moyen-satisfaction",
            "display": "Score moyen de satisfaction"
            } ],
            "text": "Score moyen de satisfaction",
            "type": "decimal",
            "readOnly": true
        }, {
            "linkId": "obs_status",
            "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.status",
            "text": "Statut de l'observation",
            "type": "choice",
            "readOnly": true,
            "answerOption": [ {
            "valueCoding": {
                "system": "http://hl7.org/fhir/observation-status",
                "code": "final",
                "display": "Final"
            },
            "initialSelected": true
            } ]
        }, {
            "linkId": "obs_code",
            "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.code",
            "text": "Code de l'observation",
            "type": "choice",
            "readOnly": true,
            "answerOption": [ {
            "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/upcare-observation-cs",
                "code": "score-moyen-satisfaction",
                "display": "Score moyen de satisfaction"
            },
            "initialSelected": true
            } ]
        } ]
        } ]
    } ],
    "questionnaire": "http://chun.upcare.fr/fhir/Questionnaire/Questionnaire-UpCare|0.1.0",
    "status": "in-progress",
    "subject": {
        "reference": "Patient/4616862c"
    },
    "authored": "2026-06-02T07:47:37+00:00",
    "author": {
        "identifier": {
        "value": "john.doe@gmail.com"
        }
    },
    "item": [ {
        "linkId": "2344e4b2-f5eb-4f54-88fa-51686a47f261",
        "text": "Ce questionnaire aborde diffÃÂ©rents aspects de votre vie il vous est demandÃÂ© dÃ¢ÂÂÃÂ©valuer votre satisfaction. Il se compose dÃ¢ÂÂune sÃÂ©rie dÃ¢ÂÂÃÂ©noncÃÂ©s pour lesquels vous devez indiquer votre position sur une ÃÂ©chelle de satisfaction composÃÂ©e de 6 modalitÃÂ©s ÃÂ« pas du tout satisfait ÃÂ» ÃÂ  ÃÂ« tout ÃÂ  fait satisfait ÃÂ»\nSoyez spontanÃÂ© et sincÃÂ¨re dans vos rÃÂ©ponses.\nCe questionnaire est anonyme, confidentiel et aucune rÃÂ©ponse individuelle ne sera communiquÃÂ©e."
    }, {
        "linkId": "05e5342c-4745-46e5-898b-9de7f6345085",
        "text": "Informations gÃÂ©nÃÂ©rales",
        "item": [ {
        "linkId": "aee11f5c-d4fa-4e78-8fe7-9a23ef692434",
        "text": "Vous ÃÂªtes",
        "answer": [ {
            "valueString": "Une femme"
        } ]
        }, {
        "linkId": "87d0898a-eb83-43bc-83e0-3705536413b2",
        "text": "Votre ÃÂ¢ge",
        "answer": [ {
            "valueInteger": 26
        } ]
        }, {
        "linkId": "7b1d0342-56d9-4011-ac62-e9466bb0e872",
        "text": "Votre date d'arrivÃÂ©e dans le service",
        "answer": [ {
            "valueDate": "2000-02-20"
        } ]
        }, {
        "linkId": "c4a48ada-a01a-4d39-a067-ea3e99d5035c",
        "text": "Votre fonction",
        "answer": [ {
            "valueString": "ASH"
        } ]
        }, {
        "linkId": "12093d97-a28d-452b-8fd3-6d6bf4527cfe",
        "text": "Votre service",
        "answer": [ {
            "valueReference": {
            "reference": "Organization/UCA-CENTRAL"
            }
        } ]
        } ]
    }, {
        "linkId": "de1f4934-cc25-4fd3-9e92-15057c488379",
        "text": "Questionnaire",
        "item": [ {
        "linkId": "429b294f-66f8-4d5a-d42d-b9955d1d9b66",
        "text": "A. Organisation et contenu du travail",
        "item": [ {
            "linkId": "59a247f8-578f-4c31-8f7c-8d08b0b552fb",
            "text": "La maniÃÂ¨re dont le travail est organisÃÂ© dans mon service",
            "answer": [ {
            "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "2"
            }
            } ]
        } ]
        }, {
        "linkId": "75c01161-9998-4212-82d0-58889ad89829",
        "text": "B. Relation entre personnel",
        "item": [ {
            "linkId": "bfdc7394-7de1-4052-8652-de260795dc46",
            "text": "Les relations humaines entre professionnels dans le service",
            "answer": [ {
            "valueCoding": {
                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                "code": "2"
            }
            } ]
        } ]
        } ]
    }, {
        "linkId": "resultats-observation",
        "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation",
        "text": "RÃÂ©sultats calculÃÂ©s",
        "item": [ {
        "linkId": "score_moyen",
        "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.valueQuantity.value",
        "text": "Score moyen de satisfaction",
        "answer": [ {
            "valueDecimal": 2
        } ]
        }, {
        "linkId": "obs_status",
        "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.status",
        "text": "Statut de l'observation",
        "answer": [ {
            "valueCoding": {
            "system": "http://hl7.org/fhir/observation-status",
            "code": "final"
            }
        } ]
        }, {
        "linkId": "obs_code",
        "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.code",
        "text": "Code de l'observation",
        "answer": [ {
            "valueCoding": {
            "system": "http://chun.upcare.fr/fhir/CodeSystem/upcare-observation-cs",
            "code": "score-moyen-satisfaction"
            }
        } ]
        } ]
    } ]
 } as any;

const questionnaireChru = qrChru.contained?.[0];

export const QuestionnaireCHRU: StoryObj<QuestionnaireDisplayProps> = {
  ...Template,
  args: {
    questionnaire: questionnaireChru,
    questionnaireResponse: qrChru,
    valueSetLoader: valueSetLoaderMock,
    onSubmit: (response) =>
      console.log("Submitted CHRU response:", JSON.stringify(response, null, 2)),
    onError: () => console.error("Error CHRU"),
  },
};