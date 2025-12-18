// React
import React, { useState } from 'react';
// React Bootstrap
import { Button, Form } from 'react-bootstrap';
// Component
import Title from '../../Title/Title';
// FHIR
import { Extension, Questionnaire, QuestionnaireItem, QuestionnaireItemEnableWhen, QuestionnaireResponse, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from 'fhir/r5';
import { Field, FieldRenderer } from './Fields';
import { ValueSetLoader } from '../../../services';

// Interface for the props of the Questionnaire component
export interface QuestionnaireDisplayProps {
    // Function to translate the text in the application
    language?: (key: string) => string;
    // Label of the primary button (Default to validate)
    submitButtonLabel?: string;
    // Function to call when you submit the form
    onSubmit: (response: QuestionnaireResponse) => void;
    // Label of the Reset button (default to Reset)
    resetButtonLabel?: string;
    //The Questionnaire to display
    questionnaire: Questionnaire
    //The QuestionnaireResponse to display
    questionnaireResponse: QuestionnaireResponse
    // The ValueSetLoader to use to load the value sets
    valueSetLoader: ValueSetLoader;
    // Disable all the form fields and hide the buttons (default to false)
    readOnly?: boolean;
    // Function to call when an error occurs
    onError: () => void;
}

const QuestionnaireDisplay: React.FC<QuestionnaireDisplayProps> = (configs) => {

    ////////////////////////////////
    //         Constants          //
    ////////////////////////////////

    const extensionToValueKeyMap: { [key: string]: string } = {
        'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-widthPercentage': 'width',
    };

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [title, setTitle] = useState<string>('');
    const [fields, setFields] = useState<Field[]>([]);
    const [form, setForm] = useState<{ [key: string]: string[] }>({});
    const [validated, setValidated] = useState(false);

    ////////////////////////////////
    //          Actions           //
    ////////////////////////////////

    /**
    * Search on a Questionnaire resource with the search params.
    *
    * @param searchParams The search params
    */
    React.useEffect(() => {
        //TODO What if no title ??
        setTitle(configs.questionnaire.title ?? "Questionnaire Title");

        const fetchedFields = configs.questionnaire.item
            ?.map(item => getFieldFromItem(item, []))
            .flat();
        setFields(fetchedFields ?? []);
        setForm(fetchedFields ? getFormFromFields(fetchedFields, {}) : {});
    }, [configs]);

    /**
     * Complete the form with all the fields retrieved from the Questionnaire.
     * 
     * @param fields the list of fields.
     * @param form the form to complete.
     * @returns the completed form.
     */
    function getFormFromFields(fields: Field[], form: { [key: string]: string[] }): { [key: string]: string[] } {
        fields.forEach(field => {
            var newValue = [field.initialValue];
            form = { ...form, [field.id]: newValue };
            if (field.subField) {
                form = getFormFromFields(field.subField, form);
            }
        })
        return form;
    }

    /**
     * Complete the form with all the fields retrieved from the Questionnaire.
     * 
     * @param form the form to complete.
     * @returns the completed form.
     */
    function massageFormForDisabledFields(fields: Field[], form: { [key: string]: string[] }): { [key: string]: string[] } {
        fields.forEach(field => {
            if (field.disabled(form, field.id)) {
                var newValue = [field.initialValue];
                console.log("reseting field : " + field.id + " to " + field.initialValue);
                form = { ...form, [field.id]: newValue };
            }
            if (field.subField) {
                form = massageFormForDisabledFields(field.subField, form);
            }
        })
        return form;
    }

    /**
     * Return the Component configuration extracted from the Questionnaire
     * 
     * @param item the Questionnaire Item
     * @returns the mapped Field
     */
    function getFieldFromItem(item: QuestionnaireItem, fieldList: Field[]): Field[] {
        var field = {
            id: item.linkId,
            prefix: item.prefix,
            label: item.text,
            type: item.type,
            placeholder: item.text,
            advancedRendering: getAdvancedRenderingFromExtensions(item.extension),
            hidden: isHidden(item.extension),
            disabled: (form, questionId) => configs.readOnly || !getFieldEnabled(item)(form, questionId),
            hideOnDisabled: configs.readOnly ? false : (!item.disabledDisplay || item.disabledDisplay === "hidden"),
            readOnly: item.readOnly ?? false,
            required: item.required ?? false,
            repeat: item.repeats ?? false,
            maxLength: item.maxLength,
            initialValue: getFieldInitialValue(item),
            subField: [],
            answerValueSet: item.answerValueSet,
            answerOption: item.answerOption,
        } as Field;
        fieldList.push(field);
        if (field.type !== 'group' && item.item && item.item.length > 0) {
            item.item?.forEach(item => getFieldFromItem(item, fieldList));
        } else if (field.type === 'group' && item.item) {
            var subFields = [] as Field[];
            item.item.forEach(item => getFieldFromItem(item, subFields));
            field.subField = subFields;
        }
        return fieldList;
    }

    /**
     * Gets the list of style properties based on extensions found in the Questionnaire for a specific item.
     * 
     * @param extensions the list of extensions for the item.
     * @returns the list of properties in a key/value format.
     */
    function getAdvancedRenderingFromExtensions(extensions: Extension[] | undefined): { [key: string]: string } {
        if (!extensions) {
            return {};
        }
        var style = extensions.filter(extension => extensionToValueKeyMap[extension.url] !== undefined)
            .map((extension: Extension) => {
                return {
                    key: extensionToValueKeyMap[extension.url],
                    value: (extension.valueString
                        || extension.valueBoolean
                        || extension.valueCode
                        || extension.valueUri
                        || extension.valuePositiveInt
                        || extension.valueDecimal) as string
                };
            }).reduce((acc: any, curr: any) => {
                return { ...acc, [curr.key]: curr.value };
            }, {});
        return style;
    }

    function isHidden(extensions: Extension[] | undefined): boolean {
        if (!extensions) {
            return false;
        }
        var isHidden = extensions.find(extension => extension.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden')?.valueBoolean;
        return isHidden ?? false;
    }

    /**
     * Extract initial value of the field from the QuestionnaireResponse resource handed as props.
     * 
     * @param item    the Questionnaire item for the field
     * @returns the initial value for the field
     */
    function getFieldInitialValue(item: QuestionnaireItem): string {

        const id = item.linkId;
        const type = item.type as string;

        //TODO how do we handle repeating response ?
        var answers = [] as QuestionnaireResponseItemAnswer[];
        if (configs.questionnaireResponse.item) {
            const item = getItemByLinkId(id, configs.questionnaireResponse.item);
            answers = item?.answer ?? [];
        }
        if (answers.length > 0) {
            switch (type) {
                case 'choice':
                    if (item.answerValueSet != undefined) {
                        return (answers[0].valueCoding
                            ? answers[0].valueCoding.system + '|' + answers[0].valueCoding.code
                            : '') as string;
                    } else if (item.answerOption !== undefined && item.answerOption.length > 0) {
                        const option = item.answerOption[0];
                        if (option.valueCoding) {
                            return (answers[0].valueCoding
                                ? answers[0].valueCoding.system + '|' + answers[0].valueCoding.code
                                : '') as string;
                        } if (option.valueInteger) {
                            return (answers[0].valueInteger ?? '') as string;
                        } if (option.valueDate) {
                            return (answers[0].valueDate ?? '') as string;
                        } if (option.valueTime) {
                            return (answers[0].valueTime ?? '') as string;
                        } if (option.valueString) {
                            return (answers[0].valueString ?? '') as string;
                        }
                        //TODO Reference
                    }
                case 'quantity':
                    return (answers[0].valueQuantity ? answers[0].valueQuantity.value + "|" + answers[0].valueQuantity.unit : '') as string;
                case 'decimal':
                    return (answers[0].valueDecimal ?? '') as string;
                case 'integer':
                    return (answers[0].valueInteger ?? '') as string;
                case 'url':
                    return answers[0].valueUri ?? '';
                case 'boolean':
                    return (answers[0].valueBoolean ?? '') as string;
                case 'coding':
                    return (answers[0].valueCoding
                        ? answers[0].valueCoding.system + '|' + answers[0].valueCoding.code
                        : '') as string;
                case 'date':
                    return (answers[0].valueDate ?? '') as string;
                case 'dateTime':
                    if (answers[0].valueDateTime) {
                        if (answers[0].valueDateTime.endsWith("Z")) {
                            return answers[0].valueDateTime.slice(0, -4) as string;
                        } else {
                            return answers[0].valueDateTime
                        }
                    } 
                    return '' as string;
                case 'time':
                    return (answers[0].valueTime ?? '') as string;
                case 'text':
                case 'string':
                case 'group':
                case 'display':
                case 'question':
                //TODO Banish Question ??
                case 'attachment':
                //TODO
                case 'reference':
                //TODO
                default:
                    return answers[0].valueString ?? '';
            }
        } else {
            switch (type) {
                case 'choice':
                    if (item.answerValueSet != undefined) {
                        //TODO
                        return '';
                    } else if ((item.answerOption?.length ?? 0) > 0) {
                        const initialSelectedOption = item.answerOption?.find(option => option.initialSelected);
                        if (initialSelectedOption) {
                            if (initialSelectedOption.valueCoding) {
                                return initialSelectedOption.valueCoding.system + '|' + initialSelectedOption.valueCoding.code;
                            } else {
                                //TODO Support reference options
                                var value = initialSelectedOption.valueInteger ?? initialSelectedOption.valueTime ?? initialSelectedOption.valueDate ?? initialSelectedOption.valueString;
                                return value as string;
                            }
                        }
                        return '';
                    } else {
                        return ''
                    }
                //TODO Same for other types of fields
            }
        }
        return '';
    }

    /**
     * Create the method to decide if the field shoud be enabled or not.
     * 
     * @param item the questionnaire item.
     * @returns the computed function.
     */
    function getFieldEnabled(item: QuestionnaireItem): (form: { [key: string]: string[] }, idInForm: string) => boolean {
        if (!item.enableWhen || item.enableWhen.length === 0) {
            return () => item.disabledDisplay !== 'protected';
        } else {
            var enableFunctions = item.enableWhen.map(enableWhen => getEnableWhenFunction(item.linkId, enableWhen));
            if (item.enableBehavior === 'all') {
                return (form, idInForm) => enableFunctions.every(f => {
                    console.log("Evaluating field enabled for %s", idInForm)
                    f(form, idInForm)
            }) && item.disabledDisplay !== 'protected';
            } else {
                return (form, idInForm) => enableFunctions.some(f => f(form, idInForm)) && item.disabledDisplay !== 'protected';
            }
        }
    }

    /**
     * Create the method to decide if the field shoud be enabled or not.
     * 
     * @param questionId the ID of the question.
     * @param enableWhen the enableWhen element form the FHIR Questionnaire.
     * @returns the computed function.
     */
    function getEnableWhenFunction(questionId: string, enableWhen: QuestionnaireItemEnableWhen): (form: { [key: string]: string[] }, idInForm: string) => boolean {
        if (enableWhen.operator === 'exists') {
            if (enableWhen.answerBoolean) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)] !== undefined && form[getActualEnableId(idInForm, enableWhen.question)].some(a => a !== '');
                }
            } else {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)] !== undefined && form[getActualEnableId(idInForm, enableWhen.question)].every(a => a !== '');
                }
            }
        } else if (enableWhen.operator === '!=') {
            if (enableWhen.answerBoolean !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerBoolean?.toString());
            } else if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerDecimal?.toString());
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerInteger?.toString());
            } else if (enableWhen.answerDate !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerDate?.toString());
            } else if (enableWhen.answerDateTime !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerDateTime?.toString());
            } else if (enableWhen.answerTime !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerTime?.toString());
            } else if (enableWhen.answerString !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerString?.toString());
            } else if (enableWhen.answerCoding !== undefined) {
                return (form, idInForm) => {
                    const expectedValue = enableWhen.answerCoding?.system + '|' + enableWhen.answerCoding?.code;
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== expectedValue);
                };
            }
        } else if (enableWhen.operator === '=') {
            if (enableWhen.answerBoolean !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerBoolean?.toString());
            } else if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerDecimal?.toString());
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerInteger?.toString());
            } else if (enableWhen.answerDate !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerDate?.toString());
            } else if (enableWhen.answerDateTime !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerDateTime?.toString());
            } else if (enableWhen.answerTime !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerTime?.toString());
            } else if (enableWhen.answerString !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerString);
            } else if (enableWhen.answerCoding !== undefined) {
                return (form, idInForm) => {
                    const expectedValue = enableWhen.answerCoding?.system + '|' + enableWhen.answerCoding?.code;
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === expectedValue);
                };
            }
        } else if (enableWhen.operator === '<') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseFloat(a) < (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseInt(a) < (enableWhen.answerInteger ?? 0));
                };
            }
        } else if (enableWhen.operator === '>') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseFloat(a) > (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseInt(a) > (enableWhen.answerInteger ?? 0));
                };
            }
        } else if (enableWhen.operator === '<=') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseFloat(a) <= (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseInt(a) <= (enableWhen.answerInteger ?? 0));
                };
            }
        } else if (enableWhen.operator === '>=') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseFloat(a) >= (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseInt(a) >= (enableWhen.answerInteger ?? 0));
                };
            }
        }

        console.log("enableWhen not supported for operator [%s] and with type [%s] for question [%s]",
            enableWhen.operator,
            enableWhen.answerBoolean ? 'boolean'
                : enableWhen.answerDecimal ? 'decimal'
                    : enableWhen.answerInteger ? 'integer'
                        : enableWhen.answerDate ? 'date'
                            : enableWhen.answerDateTime ? 'dateTime'
                                : enableWhen.answerTime ? 'time'
                                    : enableWhen.answerString ? 'string'
                                        : enableWhen.answerCoding ? 'Coding'
                                            : enableWhen.answerQuantity ? 'Quantity'
                                                : 'Reference'
            , questionId);
        return () => true;
    }

    function getActualEnableId(questionId: string, enableWhenQuestion: string): string {
        var actualEnableQuestionId: string;
        if (questionId.includes('@@')) {
            const [groupId, groupIndexStr, subFieldId] = questionId.split("@@");
            actualEnableQuestionId = `${groupId}@@${groupIndexStr}@@${enableWhenQuestion}`;
        } else {
            actualEnableQuestionId = enableWhenQuestion;
        }
        return actualEnableQuestionId;
    }

    ////////////////////////////////
    //       Form Handling        //
    ////////////////////////////////

    /**
    * Reset the form.
    */
    function onReset() {
        setForm(getFormFromFields(fields, {}));
        setValidated(false);
    }

    /**
     * Handle the submition event.
     * 
     * @param event the submit event.
     */
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const eventForm = event.currentTarget;
        if (eventForm.checkValidity() === true) {
            var newQuestionnaireResponse = { ...configs.questionnaireResponse };
            addAnswers(newQuestionnaireResponse, form);
            configs.onSubmit(newQuestionnaireResponse);
        }
        setValidated(true);
    };

    ////////////////////////////////
    //      Answer handling       //
    ////////////////////////////////

    function addAnswers(questionnaireResponse: QuestionnaireResponse, form: { [key: string]: string[] }): QuestionnaireResponse {
        for (const [key, value] of Object.entries(form)) {
            var item = undefined;
            if (questionnaireResponse.item) {
                if (!key.includes('@@')) {
                    item = getItemByLinkId(key, questionnaireResponse.item);
                } else {
                    // 1. Split ID (see for recursion)
                    const [groupId, groupIndexStr, subFieldId] = key.split("@@");
                    const groupIndex = parseInt(groupIndexStr, 10);

                    // 2. Find group item
                    var [parent, groupItems] = getItemsByLinkId(groupId, questionnaireResponse.item);
                    if (!groupItems || groupItems.length === 0) {
                        console.warn(`Group ${groupId} not found in QuestionnaireResponse`);
                    } else {
                        while (groupItems.length <= groupIndex) {
                            const base = groupItems[0];
                            const cloned = JSON.parse(JSON.stringify(base));
                            cloned.item?.forEach((i: { answer: any; }) => delete i.answer);
                            groupItems.push(cloned);
                            parent.push(cloned);
                        }
                        const repeatedInstance = groupItems[groupIndex];

                        // 4. Find subitem
                        item = repeatedInstance.item?.find(i => i.linkId === subFieldId);
                        if (!item) {
                            console.warn(`Subfield ${subFieldId} not found in group ${groupId} iteration ${groupIndex}`);
                        }
                    }
                }
            }
            if (item) {
                var originalFieldKey = undefined;
                if (key.includes('@@')) {
                    const [groupId, groupIndexStr, subFieldId] = key.split("@@");
                    originalFieldKey = subFieldId;
                } else {
                    originalFieldKey = key;
                }
                var type = getFieldType(originalFieldKey, fields);
                switch (type) {
                    case 'date':
                        item.answer = mapToDateAnswer(value);
                        break;
                    case 'decimal':
                        item.answer = mapToDecimalAnswer(value);
                        break;
                    case 'integer':
                        item.answer = mapToIntegerAnswer(value);
                        break;
                    case 'url':
                        item.answer = mapToUrlAnswer(value);
                        break;
                    case 'boolean':
                        item.answer = mapToBooleanAnswer(value);
                        break;
                    case 'text':
                    case 'string':
                        item.answer = mapToStringAnswer(value);
                        break;
                    case 'coding':
                        item.answer = mapToCodingAnswer(value);
                        break;
                    case 'dateTime':
                        item.answer = mapToDateTimeAnswer(value);
                        break;
                    case 'time':
                        item.answer = mapToTimeAnswer(value);
                        break;
                    case 'quantity':
                        item.answer = mapToQuantityAnswer(value);
                        break;
                    case 'choice':
                        if (getField(originalFieldKey, fields)?.answerValueSet) {
                            item.answer = mapToCodingAnswer(value);
                        } else if (getField(originalFieldKey, fields) && (getField(originalFieldKey, fields)?.answerOption?.length ?? 0) > 0) {
                            const firstOption = getField(originalFieldKey, fields)?.answerOption[0];
                            // It is implied that all options have the same type here
                            if (firstOption?.valueInteger) {
                                item.answer = mapToIntegerAnswer(value);
                            } else if (firstOption?.valueDate) {
                                item.answer = mapToDateAnswer(value);
                            } else if (firstOption?.valueTime) {
                                item.answer = mapToTimeAnswer(value);
                            } else if (firstOption?.valueString) {
                                item.answer = mapToStringAnswer(value);
                            } else if (firstOption?.valueCoding) {
                                item.answer = mapToCodingAnswer(value);
                            } else if (firstOption?.valueReference) {
                                console.log("Cannot convert answers for field [%s] of type [%s]", key, "reference (option)");
                            }
                            break;
                        } else {
                            item.answer = undefined;
                        }
                        break;
                    case 'attachment':
                        item.answer = mapToAttachmentAnswer(value);
                        break;
                    case 'reference':
                    default:
                        //TODO
                        console.log("Cannot convert answers for field [%s] of type [%s]", key, type);
                        break;
                }
            }
        }
        return questionnaireResponse;
    }

    function mapToCodingAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            var splittedValue = value.split('|');
            return {
                valueCoding: {
                    system: splittedValue[0],
                    code: splittedValue[1]
                }
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v)
        return answer.length > 0 ? answer : undefined;
    }

    function mapToIntegerAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueInteger: parseInt(value)
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToDateAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueDate: value
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToTimeAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueTime: value
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToStringAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueString: value
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToDecimalAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueDecimal: parseFloat(value)
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToUrlAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueUri: value
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToBooleanAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueBoolean: value === 'true'
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToDateTimeAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueDateTime: value + ':00Z'
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToQuantityAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            var splittedValue = value.split('|');
            return {
                valueQuantity: {
                    value: parseFloat(splittedValue[0]),
                    unit: splittedValue[1]
                }
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    /**
     * Function to map attachment values to QuestionnaireResponseItemAnswer.
     * 
     * @param value the value of the attachment field.
     * @returns a list of QuestionnaireResponseItemAnswer or undefined if no valid attachment found.
     */
    function mapToAttachmentAnswer(
        value: string[]
    ): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value
        .map((value) => {
            // If the value is empty, return undefined
            if (value === "") {
            return undefined;
            }
            // Try to parse the value as a JSON object
            try {
            const attachmentObj = JSON.parse(value);
            return {
                valueAttachment: {
                contentType: attachmentObj.contentType,
                data: attachmentObj.data,
                title: attachmentObj.title,
                },
            } as QuestionnaireResponseItemAnswer;
            } catch (error) {
            console.error("Error parsing attachment value:", error);
            return undefined;
            }
        })
        .filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        // Return the answer if it has valid items, otherwise return undefined
        return answer.length > 0 ? answer : undefined;
    }

    function getItemsByLinkId(linkId: string, items: QuestionnaireResponseItem[]): [QuestionnaireResponseItem[] ,QuestionnaireResponseItem[]] {
        var children = items.filter(item => item.linkId === linkId);
        
        if (children.length > 0) {
            return [items, children];
        } else {
            for (var item of items) {
                if(item.item && item.item.length > 0) {
                    var [unused, resultFromChild] = getItemsByLinkId(linkId, item.item);
                    if (resultFromChild.length > 0) {
                        return [unused, resultFromChild];
                    }
                }
            }
        }
        return [[],[]];
    }

    function getItemByLinkId(linkId: string, items: QuestionnaireResponseItem[]): QuestionnaireResponseItem | undefined {
        return items?.map((item: QuestionnaireResponseItem) => {
            if (item.linkId === linkId) {
                return item;
            } else if (item.item && item.item.length > 0) {
                return getItemByLinkId(linkId, item.item);
            }
            return undefined;
        }).find(item => item !== undefined);
    }

    function getFieldType(linkId: string, fieldList: Field[]): string | undefined {
        return fieldList.map((field: Field) => {
            if (field.id === linkId) {
                return field.type;
            } else if (field.subField && field.subField.length > 0) {
                return getFieldType(linkId, field.subField);
            }
            return undefined;
        }).find(item => item !== undefined);
    }

    function getField(linkId: string, fieldList: Field[]): Field | undefined {
        return fieldList.map((field: Field) => {
            if (field.id === linkId) {
                return field;
            } else if (field.subField && field.subField.length > 0) {
                return getField(linkId, field.subField);
            }
            return undefined;
        }).find(item => item !== undefined);
    }

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <div className='d-flex flex-column gap-1'>
            <Title
                level={2}
                content={title}
            />
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
                <Form.Group>
                    {fields.map(field => FieldRenderer.getFieldComponent(field, form, (form) => setForm(massageFormForDisabledFields(fields, form)), configs.valueSetLoader))}
                </Form.Group>
                {!configs.readOnly &&
                    <Form.Group className="d-flex flex-wrap align-items-start gap-4">
                        <Button
                            className="button"
                            variant="primary"
                            type='submit'
                        >
                            {
                                //TODO if we have a language, dont we want to pass keys instead of labels ?..
                                configs.submitButtonLabel ||
                                (configs.language ?
                                    configs.language('button.validate')
                                    : 'Validate')}
                        </Button>
                        <Button
                            className="button"
                            variant="secondary"
                            onClick={() => onReset()}
                        >
                            {configs.resetButtonLabel ||
                                (configs.language ?
                                    configs.language('button.reset')
                                    : 'Reset')}
                        </Button>
                    </Form.Group>
                }
            </Form>
        </div>
    );
};

export default QuestionnaireDisplay;