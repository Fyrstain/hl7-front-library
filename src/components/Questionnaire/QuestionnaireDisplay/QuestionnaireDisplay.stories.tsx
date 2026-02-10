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
  searchValueSet: async (_url: string) => [],
  toCodeableConcept: (code: any) => ({ coding: [code] }),
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
