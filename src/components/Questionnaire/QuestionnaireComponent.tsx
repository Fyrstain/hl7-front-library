// React
import React, { useState } from 'react';
// FHIR
import Client from 'fhir-kit-client';
import { Bundle, Questionnaire, QuestionnaireResponse } from 'fhir/r5';
// Components
import QuestionnaireDisplay from './QuestionnaireDisplay';
import { ValueSetLoader } from '../../services';
import ContextSelectionModal from './ContextSelectionModal';
import { resolveQuestionnaireContext } from './ContextSelectionModal/ContextSelectionModal';

// Interface for the props of the Questionnaire component
export interface QuestionnaireProps {
    // Function to translate the text in the application
    language?: (key: string) => string;
    // Label of the primary button
    primaryButtonLabel?: string;
    // Label of the secondary button
    secondaryButtonLabel?: string;
    // Server URL
    dataUrl: string;
    // SDC Engine Url
    sdcUrl: string;
    // Terminology URL
    terminologyUrl: string;
    // The url of the questionnaire
    questionnaireUrl: string;
    // Disable all the form field and hide the buttons (default to false)
    readOnly?: boolean;
    contextSelection?: {
        enabled: boolean;
        title?: string;
        displayMode?: "modal";
        searchMode?: "identifier";
        resourceTypes?: string[];
    };
    populateOnContextSelection?: boolean;
    onContextSelected?: (reference: string) => void;
    // Function to call when you submit the form
    onSubmit: (questionnaireResponse: QuestionnaireResponse, bundle: Bundle) => void;
    // Function to call when an error occurs
    onError: () => void;
}

const QuestionnaireComponent: React.FC<QuestionnaireProps> = (configs) => {

    ////////////////////////////////
    //           Client           //
    ////////////////////////////////

    const fhirClient = React.useMemo(() => new Client({
        baseUrl: configs.dataUrl ?? 'fhir'
    }), [configs.dataUrl]);

    const sdcClient = React.useMemo(() => new Client({
        baseUrl: configs.sdcUrl ?? 'fhir'
    }), [configs.dataUrl]);

    const terminologyClient = React.useMemo(() => new Client({
        baseUrl: configs.terminologyUrl ?? 'fhir'
    }), [configs.dataUrl]);

    const valueSetLoader = new ValueSetLoader(terminologyClient);

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [questionnaire, setQuestionnaire] = useState<Questionnaire>();
    const [questionnaireResponse, setQuestionnaireResponse] = useState<QuestionnaireResponse>();

    const [showContextModal, setShowContextModal] = useState(false);
    const [selectedContextReference, setSelectedContextReference] = useState<string>();
    const [selectedContextLabel, setSelectedContextLabel] = useState<string>();

    ////////////////////////////////
    //          Actions           //
    ////////////////////////////////

    const populateQuestionnaire = async (
    questionnaireToPopulate: Questionnaire,
    contextReference?: string
) => {
    const parameters: any[] = [
        {
            name: "questionnaire",
            resource: questionnaireToPopulate,
        },
    ];

    if (contextReference) {
        parameters.push({
            name: "subject",
            valueString: contextReference,
        });
    }
    const populateResponse = await sdcClient.operation({
        name: "populate",
        resourceType: "Questionnaire",
        method: "POST",
        input: {
            resourceType: "Parameters",
            parameter: parameters,
        },
    });

    setQuestionnaireResponse(populateResponse as QuestionnaireResponse);
};

    /**
    * Search on a Questionnaire resource with the search params.
    *
    * @param searchParams The search params
    */
    React.useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const searchQuestionnaireResponse = await fhirClient.search({
                    resourceType: 'Questionnaire',
                    searchParams: { url: configs.questionnaireUrl },
                });
                const foundQuestionnaire = searchQuestionnaireResponse.entry[0].resource as Questionnaire;
                setQuestionnaire(foundQuestionnaire);

                const resourceTypes =
                    configs.contextSelection?.resourceTypes ??
                    foundQuestionnaire.subjectType ??
                    [];

                if (!configs.contextSelection?.enabled || resourceTypes.length === 0) {
                    await populateQuestionnaire(foundQuestionnaire);
                    return;
                }

                const contextResult = await resolveQuestionnaireContext(fhirClient, resourceTypes);

                if (contextResult.type === "none") {
                    await populateQuestionnaire(foundQuestionnaire);
                    return;
                }

                if (contextResult.type === "single") {
                    setSelectedContextReference(contextResult.reference);
                    setSelectedContextLabel(contextResult.label);
                    configs.onContextSelected?.(contextResult.reference);
                    await populateQuestionnaire(foundQuestionnaire, contextResult.reference);
                    return;
                }
                
                setShowContextModal(true);
            } catch (error) {
                configs.onError();
            }
        };
        fetchQuestionnaire();
    }, [configs.questionnaireUrl, configs.onError, fhirClient]);

    function extractAndSubmit(questionnaireResponse: QuestionnaireResponse) {
        sdcClient.operation({
            name: "extract",
            resourceType: 'QuestionnaireResponse',
            method: "POST",
            input: {
                resourceType: "Parameters",
                parameter: [
                    {
                        name: "questionnaire-response",
                        resource: questionnaireResponse
                    }
                ]
            },
        })
            .then(response => {
                if (response.resourceType !== 'Bundle') {
                    throw Error(response.statusText);
                }
                configs.onSubmit(questionnaireResponse, response as Bundle);
            })
            .catch(configs.onError);
    }

    const contextResourceTypes =
        configs.contextSelection?.resourceTypes ??
        questionnaire?.subjectType ??
        [];

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

   return (
    <React.Fragment>
        {configs.contextSelection?.enabled && contextResourceTypes.length > 0 && (
            <ContextSelectionModal
                show={showContextModal}
                title={configs.contextSelection?.title ?? "Sélectionner un contexte"}
                serverUrl={configs.dataUrl}
                resourceTypes={contextResourceTypes}
                onSelect={async (reference, label) => {
                    setSelectedContextReference(reference);
                    setSelectedContextLabel(label);
                    setShowContextModal(false);
                    configs.onContextSelected?.(reference);

                    if (configs.populateOnContextSelection ?? true) {
                        await populateQuestionnaire(questionnaire as Questionnaire, reference);
                    }
                }}
                onCancel={() => setShowContextModal(false)}
                onError={configs.onError}
            />
        )}
        {selectedContextReference && (
            <div className="mb-3">
                <label className="form-label">Ressource sélectionnée</label>
                <select className="form-select" value={selectedContextReference} disabled>
                    <option value={selectedContextReference}>
                        {selectedContextLabel ?? selectedContextReference}
                    </option>
                </select>
            </div>
        )}
        {questionnaireResponse && (
        <QuestionnaireDisplay
            submitButtonLabel={configs.primaryButtonLabel}
            resetButtonLabel={configs.secondaryButtonLabel}
            questionnaire={questionnaire ?? {} as Questionnaire}
            questionnaireResponse={questionnaireResponse}
            valueSetLoader={valueSetLoader}
            readOnly={configs.readOnly ?? false}
            onSubmit={(questionnaireResponse) => { extractAndSubmit(questionnaireResponse) }}
            onError={configs.onError}
        />
        )}
    </React.Fragment>
);
};

export default QuestionnaireComponent;