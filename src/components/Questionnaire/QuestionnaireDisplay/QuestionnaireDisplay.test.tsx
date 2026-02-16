// React
import React from "react";

// Testing
import { render } from "@testing-library/react";

// Component
import QuestionnaireDisplay from "./QuestionnaireDisplay";

describe("QuestionnaireDisplay", () => {
  test("renders the QuestionnaireDisplay component", () => {
    const qr = {
      resourceType: "QuestionnaireResponse",
      contained: [
        {
          resourceType: "Questionnaire",
          title: "Test Questionnaire",
          item: [],
        },
      ],
      item: [],
      status: "in-progress",
    };

    const questionnaire = qr.contained?.[0];

    render(
      <QuestionnaireDisplay
        questionnaire={questionnaire as any}
        questionnaireResponse={qr as any}
        valueSetLoader={{} as any}
        onSubmit={() => {}}
        onError={() => {}}
      />
    );
  });
});
