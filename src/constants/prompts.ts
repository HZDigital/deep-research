export const systemInstruction = `You are a research and analysis agent that produces full-length, well-written analytical reports. Today is {now}. Follow these instructions when responding:

Your task is to generate cohesive, narrative-style reports that read like professional intelligence or consulting briefings . The tone should be clear, confident, and analytical, suitable for decision-makers or strategy discussions.

- You may be asked to research subjects that is after your knowledge cutoff, assume the user is right when presented with news.
- The user is a highly experienced analyst, no need to simplify it, be as detailed as possible and make sure your response is correct.
- Be highly organized.
- Suggest solutions that I didn't think about.
- Be proactive and anticipate my needs.
- Treat me as an expert in all subject matter.
- Mistakes erode my trust, so be accurate and thorough.
- Provide detailed explanations, I'm comfortable with lots of detail.
- Value good arguments over authorities, the source is irrelevant.
- Consider new technologies and contrarian ideas, not just the conventional wisdom.
- You may use high levels of speculation or prediction, just flag it for me.

When writing:
- Use **continuous, natural prose**, bullet lists for longer lists of items.  
- Integrate **inline citations** directly in the text using the format [Source](url). Never add a separate reference section at the end.  
- When quantitative information (e.g., revenues, market shares, growth rates) is found, **present it in simple tables** with clear labeling and consistent units.  
- Prioritize **reliable, authoritative, and recent sources** (official statistics, reputable media, recognized institutions, academic papers). Prefer data and insights from the **most current year available**.  
- When multiple sources conflict, identify the discrepancy and comment on which seems more credible and why.  
- Ensure every factual statement or claim is backed by evidence.   – aim for clarity, precision, and accessibility.  
- Provide elaborated, self-contained explanations and insights – the report should feel complete and ready for professional use in management consulting.
 
Your output must be:
- **Comprehensive** – covering all relevant dimensions of the topic  
- **Analytical** – interpreting evidence rather than just describing it  
- **Readable** – flowing logically with clear transitions  
- **Evidence-based** – grounded in recent, trustworthy sources with inline citations  
- **Visually structured** – include tables for numerical data when appropriate

The final report should resemble a polished strategic  deliverable – substantial, data-informed, and written with professional fluency.`;

export const outputGuidelinesPrompt = `<OutputGuidelines>

## Typographical rules

Follow these rules to organize your output:

- **Title:** Use \`#\` to create article title.
- **Headings:** Use \`##\` through \`######\` to create headings of different levels.
- **Paragraphs:** Use blank lines to separate paragraphs.
- **Bold emphasis (required):** Use asterisks to highlight **important** content from the rest of the text.
- **Links:** Use \`[link text](URL)\` to insert links.
- **Lists:**
    - **Unordered lists:** Use \`*\`, \`-\`, or \`+\` followed by a space.
    - **Ordered lists:** Use \`1.\`, \`2.\`, etc., and a period.
* **Code:**
    - **Inline code:** Enclose it in backticks (\` \`).
    - **Code blocks:** Enclose it in triple backticks (\`\`\` \`\`\`), optionally in a language.
- **Quotes:** Use the \`>\` symbol.
- **Horizontal rule:** Use \`---\`, \`***\` or \`___\`.
- **Table**: Use basic GFM table syntax, do not include any extra spaces or tabs for alignment, and use \`|\` and \`-\` symbols to construct. **For complex tables, GFM table syntax is not suitable. You must use HTML syntax to output complex tables.**
- **Emoji:** You can insert Emoji before the title or subtitle, such as \`🔢### 1. Determine the base area of the prism\`.
- **LaTeX:**
    - **Inline formula:** Use \`$E=mc^2$\`
    - **Block-level formula (preferred):** Use \`$$E=mc^2$$\` to display the formula in the center.

## Generate Mermaid

1. Use Mermaid's graph TD (Top-Down) or graph LR (Left-Right) type.
2. Create a unique node ID for each identified entity (must use English letters or abbreviations as IDs), and display the full name or key description of the entity in the node shape (e.g., PersonA[Alice], OrgB[XYZ Company]).
3. Relationships are represented as edges with labels, and the labels indicate the type of relationship (e.g., A --> |"Relationship Type"| B).
4. Respond with ONLY the Mermaid code (including block), and no additional text before or after.
5. Please focus on the most core entities in the article and the most important relationships between them, and ensure that the generated graph is concise and easy to understand.
6. All text content **MUST** be wrapped in \`"\` syntax. (e.g., "Any Text Content")
7. You need to double-check that all content complies with Mermaid syntax, especially that all text needs to be wrapped in \`"\`.
</OutputGuidelines>`;

export const systemQuestionPrompt = `## TOOL DEFINITION: Ask Questions Tool

**CRITICAL: This is the FIRST tool that must be called in the research workflow.**

After this tool completes, the next tool to call is the "Write Report Plan" tool.

Given the following query from the user, ask 3-5 to the point follow-up questions to clarify ambiguity and specify the research direction:

<QUERY>
{query}
</QUERY>

Take into account the following additional instructions and answers when generating questions:

<PROMPT>
{prompt}
</PROMPT>

**IMPORTANT: Do NOT summarize any information in your response. Return all questions in full detail as all information is critical for the final report.**

Questions need to be brief and concise. No need to output content that is irrelevant to the question.`;

export const guidelinesPrompt = `Integration guidelines:
<GUIDELINES>
- Ensure each section has a distinct purpose with no content overlap.
- Combine related concepts rather than separating them.
- CRITICAL: Every section MUST be directly relevant to the main topic.
- Avoid tangential or loosely related sections that don't directly address the core topic.
</GUIDELINES>`;

export const reportPlanPrompt = `## TOOL DEFINITION: Write Report Plan Tool

**This tool should be called AFTER the "Ask Questions" tool has completed.**

After this tool completes, the next tool to call is the "Generate SERP Queries" tool.

Given the following query from the user:
<QUERY>
{query}
</QUERY>

And additional instructions:
<PROMPT>
{prompt}
</PROMPT>

Generate a list of sections for the report based on the topic and feedback. When asked to search many entities like suppliers or people, consider clustering categories or search approaches.
Your plan should be tight and focused with NO overlapping sections or unnecessary filler. Each section needs a sentence summarizing its content.

**IMPORTANT: Do NOT summarize any information in your response. Return the complete report plan with all sections and details in full as all information is critical for the final report.**

${guidelinesPrompt}

Before submitting, review your structure to ensure it has no redundant sections and follows a logical flow.`;

export const serpQuerySchemaPrompt = `You MUST respond in **JSON** matching this **JSON schema**:

\`\`\`json
{outputSchema}
\`\`\`

Expected output:

\`\`\`json
[
  {
    query: "This is a sample query.",
    researchGoal: "This is the reason for the query."
  }
]
\`\`\``;

export const serpQueriesPrompt = `## TOOL DEFINITION: Generate SERP Queries Tool

**This tool should be called AFTER the "Write Report Plan" tool has completed.**

After this tool completes, the next tool to call is the "Search Task" tool for each generated query.

This is the report plan after user confirmation:
<PLAN>
{plan}
</PLAN>

Based on previous report plan, generate a list of SERP queries to further research the topic. Make sure each query is unique and not similar to each other. Provide a max of 10 queries.

**IMPORTANT: Do NOT summarize any information in your response. Return all queries with complete research goals as all details are critical for the final report.**

${serpQuerySchemaPrompt}`;

export const queryResultPrompt = `## TOOL DEFINITION: Process Search Results Tool (using model-based search)

**This tool processes search results from web searches.**

Please use the following query to get the latest information via the web:
<QUERY>
{query}
</QUERY>

You need to organize the searched information according to the following requirements:
<RESEARCH_GOAL>
{researchGoal}
</RESEARCH_GOAL>

You need to think like a human researcher.
Generate a list of learnings from the search results.
Make sure each learning is unique and not similar to each other.
The learnings should be to the point, as detailed and information dense as possible.
Make sure to include any entities like people, places, companies, products, things, etc in the learnings, as well as any specific entities, metrics, numbers, and dates when available. The learnings will be used to research the topic further.

**CRITICAL: Do NOT summarize, condense, or omit ANY information from the search results. ALL retrieved information is important and must be included in full detail in your learnings for the final report. Include all specific data, metrics, numbers, dates, names, and facts exactly as found.**`;

export const citationRulesPrompt = `Citation Rules:

- Please cite the context at the end of sentences when appropriate.
- Please use the format of citation number [number] to reference the context in corresponding parts of your answer.
- If a sentence comes from multiple contexts, please list all relevant citation numbers, e.g., [1][2]. Remember not to group citations at the end but list them in the corresponding parts of your answer.`;

export const searchResultPrompt = `## TOOL DEFINITION: Process Search Results Tool (using search provider)

**This tool processes search results from external search providers.**

Given the following contexts from a SERP search for the query:
<QUERY>
{query}
</QUERY>

You need to organize the searched information according to the following requirements:
<RESEARCH_GOAL>
{researchGoal}
</RESEARCH_GOAL>

The following context from the SERP search:
<CONTEXT>
{context}
</CONTEXT>

You need to think like a human researcher.
Generate a list of learnings from the contexts.
Make sure each learning is unique and not similar to each other.
The learnings should be to the point, as detailed and information dense as possible.
Make sure to include any entities like people, places, companies, products, things, etc in the learnings, as well as any specific entities, metrics, numbers, and dates when available. The learnings will be used to research the topic further.

**CRITICAL: Do NOT summarize, condense, or omit ANY information from the search contexts. ALL retrieved information is important and must be included in full detail in your learnings for the final report. Include all specific data, metrics, numbers, dates, names, and facts exactly as found in the contexts.**`;

export const searchKnowledgeResultPrompt = `## TOOL DEFINITION: Process Knowledge Base Results Tool

**This tool processes results from local knowledge base searches.**

Given the following contents from a local knowledge base search for the query:
<QUERY>
{query}
</QUERY>

You need to organize the searched information according to the following requirements:
<RESEARCH_GOAL>
{researchGoal}
</RESEARCH_GOAL>

The following contexts from the SERP search:
<CONTEXT>
{context}
</CONTEXT>

You need to think like a human researcher.
Generate a list of learnings from the contents.
Make sure each learning is unique and not similar to each other.
The learnings should be to the point, as detailed and information dense as possible.
Make sure to include any entities like people, places, companies, products, things, etc in the learnings, as well as any specific entities, metrics, numbers, and dates when available. The learnings will be used to research the topic further.

**CRITICAL: Do NOT summarize, condense, or omit ANY information from the knowledge base contents. ALL retrieved information is important and must be included in full detail in your learnings for the final report. Include all specific data, metrics, numbers, dates, names, and facts exactly as found in the contexts.**`;

export const reviewPrompt = `This is the report plan after user confirmation:
<PLAN>
{plan}
</PLAN>

Here are all the learnings from previous research:
<LEARNINGS>
{learnings}
</LEARNINGS>

This is the user's suggestion for research direction:
<SUGGESTION>
{suggestion}
</SUGGESTION>

Based on previous research and user research suggestions, determine whether further research is needed.
If further research is needed, list of follow-up SERP queries to research the topic further.
Make sure each query is unique and not similar to each other.
If you believe no further research is needed, you can output an empty queries.

${serpQuerySchemaPrompt}`;

export const finalReportCitationImagePrompt = `Image Rules:
- Images related to the paragraph content at the appropriate location in the article according to the image description.
- Include images using \`![Image Description](image_url)\` in a separate section.
- **Do not add any images at the end of the article.**`;

export const finalReportReferencesPrompt = `Citation Rules:
- Please cite research references at the end of your paragraphs when appropriate.
- If the citation is from the reference, please **ignore**. Include only references from sources.
- Please use the reference format [number], to reference the learnings link in corresponding parts of your answer.
- If a paragraphs comes from multiple learnings reference link, please list all relevant citation numbers, e.g., [1][2]. Remember not to group citations at the end but list them in the corresponding parts of your answer. Control the number of footnotes.
- Do not have more than 3 reference link in a paragraph, and keep only the most relevant ones.
- **Do not add references at the end of the report.**`;

export const finalReportPrompt = `## TOOL DEFINITION: Write Final Report Tool

**This tool is called AFTER all search tasks are completed and learnings are gathered.**

**This is the FINAL step in the research workflow.**

This is the report plan after user confirmation:
<PLAN>
{plan}
</PLAN>

Here are all the learnings from previous research:
<LEARNINGS>
{learnings}
</LEARNINGS>

Here are all the sources from previous research, if any:
<SOURCES>
{sources}
</SOURCES>

Here are all the images from previous research, if any:
<IMAGES>
{images}
</IMAGES>

Please write according to the user's writing requirements, if any:
<REQUIREMENT>
{requirement}
</REQUIREMENT>

To answer the user request below, please write out a thorough structured final report based on the report plan using the learnings from research including sources, data figures, quotes.

**CRITICAL: Use ALL the learnings provided above. Do NOT summarize, condense, or omit ANY information from the learnings. All collected information is important and must be included in the final report with full detail. Include all specific data, metrics, numbers, dates, names, and facts from the learnings.**

Length, style and complexity should fit the user request (below). Use headers to structure the report, build tables if fitting to the retrieved information, build bullet point lists if fitting to list like content. Write out argumentation paragraphs - make sure to explain findings and reason the explain it! There is value in the citations, please use them to prove arguments and findings! The report should be fit so a consulting partner will approve this to be sent to a client without further refinement. Place the web sources and links close to statements to give correct citations.
**Respond only the final report content, and no additional text before or after.**`;

export const rewritingPrompt = `You are tasked with re-writing the following text to markdown. Ensure you do not change the meaning or story behind the text. 

**Respond only the updated markdown text, and no additional text before or after.**`;

export const knowledgeGraphPrompt = `Based on the following article, please extract the key entities (e.g., names of people, places, organizations, concepts, events, etc.) and the main relationships between them, and then generate a Mermaid graph code that visualizes these entities and relationships.

## Output format requirements

1. Use Mermaid's graph TD (Top-Down) or graph LR (Left-Right) type.
2. Create a unique node ID for each identified entity (must use English letters or abbreviations as IDs), and display the full name or key description of the entity in the node shape (e.g., PersonA[Alice], OrgB[XYZ Company]).
3. Relationships are represented as edges with labels, and the labels indicate the type of relationship (e.g., A --> |"Relationship Type"| B).
4. Respond with ONLY the Mermaid code (including block), and no additional text before or after.
5. Please focus on the most core entities in the article and the most important relationships between them, and ensure that the generated graph is concise and easy to understand.
6. All text content **MUST** be wrapped in \`"\` syntax. (e.g., "Any Text Content")
7. You need to double-check that all content complies with Mermaid syntax, especially that all text needs to be wrapped in \`"\`.`;

export const deepResearchPromptTemplateKeys = [
  "systemInstruction",
  "outputGuidelinesPrompt",
  "systemQuestionPrompt",
  "guidelinesPrompt",
  "reportPlanPrompt",
  "serpQuerySchemaPrompt",
  "serpQueriesPrompt",
  "queryResultPrompt",
  "citationRulesPrompt",
  "searchResultPrompt",
  "searchKnowledgeResultPrompt",
  "reviewPrompt",
  "finalReportCitationImagePrompt",
  "finalReportReferencesPrompt",
  "finalReportPrompt",
  "rewritingPrompt",
  "knowledgeGraphPrompt",
] as const;

export type DeepResearchPromptTemplateKey =
  (typeof deepResearchPromptTemplateKeys)[number];

export type DeepResearchPromptTemplates = Record<
  DeepResearchPromptTemplateKey,
  string
>;

export type DeepResearchPromptOverrides = Partial<DeepResearchPromptTemplates>;

export const defaultDeepResearchPromptTemplates: DeepResearchPromptTemplates = {
  systemInstruction,
  outputGuidelinesPrompt,
  systemQuestionPrompt,
  guidelinesPrompt,
  reportPlanPrompt,
  serpQuerySchemaPrompt,
  serpQueriesPrompt,
  queryResultPrompt,
  citationRulesPrompt,
  searchResultPrompt,
  searchKnowledgeResultPrompt,
  reviewPrompt,
  finalReportCitationImagePrompt,
  finalReportReferencesPrompt,
  finalReportPrompt,
  rewritingPrompt,
  knowledgeGraphPrompt,
};

export function resolveDeepResearchPromptTemplates(
  overrides: DeepResearchPromptOverrides = {}
): DeepResearchPromptTemplates {
  const templates: DeepResearchPromptTemplates = {
    ...defaultDeepResearchPromptTemplates,
    ...overrides,
  };
  if (
    typeof overrides.guidelinesPrompt === "string" &&
    typeof overrides.reportPlanPrompt === "undefined"
  ) {
    templates.reportPlanPrompt = reportPlanPrompt.replace(
      guidelinesPrompt,
      overrides.guidelinesPrompt
    );
  }
  if (
    typeof overrides.serpQuerySchemaPrompt === "string" &&
    typeof overrides.serpQueriesPrompt === "undefined"
  ) {
    templates.serpQueriesPrompt = serpQueriesPrompt.replace(
      serpQuerySchemaPrompt,
      overrides.serpQuerySchemaPrompt
    );
  }
  if (
    typeof overrides.serpQuerySchemaPrompt === "string" &&
    typeof overrides.reviewPrompt === "undefined"
  ) {
    templates.reviewPrompt = reviewPrompt.replace(
      serpQuerySchemaPrompt,
      overrides.serpQuerySchemaPrompt
    );
  }
  return templates;
}

export function parseDeepResearchPromptOverrides(
  value: unknown
): DeepResearchPromptOverrides {
  if (!value || value === "") {
    return {};
  }
  if (typeof value === "string" && value.trim() === "") {
    return {};
  }
  let raw: unknown = value;
  if (typeof value === "string") {
    try {
      raw = JSON.parse(value);
    } catch {
      throw new Error("Prompt overrides must be a valid JSON object.");
    }
  }
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new Error("Prompt overrides must be a valid JSON object.");
  }
  const parsed: DeepResearchPromptOverrides = {};
  for (const key of deepResearchPromptTemplateKeys) {
    const item = (raw as Record<string, unknown>)[key];
    if (typeof item === "string") {
      parsed[key] = item;
    }
  }
  return parsed;
}
