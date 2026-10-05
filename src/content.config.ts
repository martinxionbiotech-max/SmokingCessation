import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),
      canonical: z.url().optional(),
      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),
      description: z.string().optional(),
      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

// ---------------------------------------------------------------------------
// Experience Database — de-identified, structured quit-smoking experiences
// ---------------------------------------------------------------------------
export const experienceSchema = z.object({
  // Identity & provenance
  experienceId: z.string(),
  title: z.string().optional(),
  summary: z.string().optional(),
  sourcePlatform: z.string(), // e.g. "Baidu Tieba (Quit Smoking bar)"
  sourceUrl: z.string().optional(), // internal reference only, not published
  sourceDate: z.string().optional(),
  publishedDate: z.coerce.date(),

  // Smoking history — only what was explicitly reported. NEVER inferred.
  ageGroup: z.string().optional(), // e.g. "30s" — only if explicit
  gender: z.string().optional(), // only if explicit
  yearsSmoking: z.string().optional(), // reported text, e.g. "about 15 years" or "Not reported"
  cigarettesPerDay: z.string().optional(), // reported text only
  quitAttemptNumber: z.string().optional(),
  smokingType: z.string().optional(), // cigarettes / hand-rolled / social / heavy / long-term

  // Quit attempt
  quitMethod: z.array(z.string()).optional(), // one or more methods
  quitDate: z.string().optional(),
  recoveryDay: z.number().optional(), // day N of the quit attempt
  recoveryStage: z.string().optional(), // e.g. "First Week", "First Month"

  // Experience details
  motivation: z.string().optional(),
  trigger: z.array(z.string()).optional(),
  craving: z.string().optional(), // description or intensity
  emotionalState: z.string().optional(),
  physicalSymptoms: z.array(z.string()).optional(),
  behavior: z.string().optional(), // what the person did in the moment
  intervention: z.string().optional(), // what they tried
  strategy: z.string().optional(),
  medicationReported: z.string().optional(), // only what the person reported
  nicotineReplacementReported: z.string().optional(),
  outcome: z.string().optional(),
  relapse: z.boolean().optional(),
  relapseTrigger: z.string().optional(),
  reportedChanges: z.string().optional(),
  positiveChanges: z.string().optional(),
  negativeChanges: z.string().optional(),
  lessons: z.string().optional(),
  uncertainties: z.string().optional(),

  // Governance
  evidenceStatus: z.enum(['community-report', 'pattern-supported', 'evidence-aligned', 'evidence-mixed']).default('community-report'),
  privacyStatus: z.enum(['de-identified', 'needs-review']).default('de-identified'),
  qualityScore: z.number().min(0).max(10).optional(),
  confidenceLevel: z.enum(['low', 'medium', 'high']).default('medium'),
  editorialStatus: z.enum(['published', 'review', 'noindex']).default('published'),
  duplicateOf: z.string().optional(),

  metadata: metadataDefinition(),
});

// ---------------------------------------------------------------------------
// Research Database — real studies, never fabricated
// ---------------------------------------------------------------------------
export const researchSchema = z.object({
  researchId: z.string(),
  title: z.string(),
  authors: z.string().optional(),
  year: z.number().optional(),
  journal: z.string().optional(),
  doi: z.string().optional(),
  pmid: z.string().optional(),
  researchType: z.enum([
    'Systematic Review',
    'Meta-analysis',
    'RCT',
    'Clinical Guideline',
    'Cohort Study',
    'Observational Study',
    'Review',
    'Public Health Report',
  ]),
  population: z.string().optional(),
  sampleSize: z.string().optional(),
  method: z.string().optional(),
  mainQuestion: z.string().optional(),
  mainFindings: z.string(),
  limitations: z.string().optional(),
  evidenceStrength: z.enum(['Strong', 'Moderate', 'Limited', 'Mixed', 'Insufficient']).default('Moderate'),
  clinicalRelevance: z.string().optional(),
  relatedTopics: z.array(z.string()).optional(),
  sourceUrl: z.string(),
  lastVerified: z.string(),
  metadata: metadataDefinition(),
});

// ---------------------------------------------------------------------------
// Triggers — smoking triggers database
// ---------------------------------------------------------------------------
export const triggerSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  definition: z.string(),
  communityReports: z.string(), // pattern description, never "X causes relapse"
  reportedContexts: z.array(z.string()).optional(),
  relatedExperiences: z.array(z.string()).optional(),
  scientificEvidence: z.string(),
  evidenceStrength: z.enum(['Strong', 'Moderate', 'Limited', 'Mixed', 'Insufficient']).default('Limited'),
  practicalStrategies: z.array(z.string()),
  limitations: z.string(),
  metadata: metadataDefinition(),
});

// ---------------------------------------------------------------------------
// Quit Methods — cessation method database
// ---------------------------------------------------------------------------
export const methodSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(), // e.g. "Behavioral", "Medication"
  summary: z.string(),
  whatItIs: z.string(),
  howItWorks: z.string(),
  evidence: z.string(),
  evidenceStrength: z.enum(['Strong', 'Moderate', 'Limited', 'Mixed', 'Insufficient']).default('Moderate'),
  reportedCommunityExperiences: z.string(),
  practicalConsiderations: z.array(z.string()),
  limitations: z.string(),
  commonAdverseEffects: z.string().optional(),
  safetyConsiderations: z.string().optional(),
  guidelineStatus: z.string().optional(),
  comparisonNote: z.string().optional(),
  sources: z.string().optional(),
  lastReviewed: z.string().optional(),
  medicationWarning: z.boolean().default(false),
  metadata: metadataDefinition(),
});

// ---------------------------------------------------------------------------
// Withdrawal symptoms
// ---------------------------------------------------------------------------
export const withdrawalSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  whatScienceSays: z.string(),
  whatPeopleReport: z.string(),
  typicalUncertainty: z.string(),
  howPeopleManage: z.array(z.string()),
  evidenceSupportedApproaches: z.array(z.string()),
  whenToSeekMedicalAdvice: z.string(),
  metadata: metadataDefinition(),
});

// ---------------------------------------------------------------------------
// Relapse cases / patterns
// ---------------------------------------------------------------------------
export const relapseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  situation: z.string(), // what happened before relapse
  trigger: z.array(z.string()).optional(),
  timeContext: z.string().optional(),
  emotionalState: z.string().optional(),
  socialEnvironment: z.string().optional(),
  alcoholUse: z.string().optional(),
  previousQuitDuration: z.string().optional(),
  interventionAttempted: z.string().optional(),
  outcome: z.string(),
  reasonReported: z.string().optional(),
  whatHappenedAfter: z.string().optional(),
  lessons: z.string().optional(),
  evidenceContext: z.string(),
  metadata: metadataDefinition(),
});

// ---------------------------------------------------------------------------
// Timeline stages — science vs community distinction is mandatory
// ---------------------------------------------------------------------------
export const timelineSchema = z.object({
  slug: z.string(),
  title: z.string(),
  timeLabel: z.string(), // "First Hour", "Day 2"...
  scienceSummary: z.string(),
  scienceDetail: z.string(),
  communitySummary: z.string(), // what people report — never "will happen"
  communityDetail: z.string(),
  evidenceStrength: z.enum(['Strong', 'Moderate', 'Limited', 'Mixed', 'Insufficient']).default('Moderate'),
  sources: z.array(z.string()).optional(),
  metadata: metadataDefinition(),
});

// ---------------------------------------------------------------------------
// Community Patterns
// ---------------------------------------------------------------------------
export const patternSchema = z.object({
  slug: z.string(),
  title: z.string(),
  observedPattern: z.string(),
  numberOfRelevantExperiences: z.number().default(0),
  commonContexts: z.array(z.string()).optional(),
  reportedStrategies: z.array(z.string()).optional(),
  contradictoryExperiences: z.string().optional(),
  scientificEvidence: z.string(),
  possibleExplanations: z.string(),
  whatWeDoNotKnow: z.string(),
  practicalTakeaways: z.array(z.string()),
  metadata: metadataDefinition(),
});

// ---------------------------------------------------------------------------
// Questions — question database for AIO + FAQ
// ---------------------------------------------------------------------------
export const questionSchema = z.object({
  slug: z.string(),
  question: z.string(),
  shortAnswer: z.string(), // 40-80 words, direct answer
  fullAnswer: z.string(),
  evidence: z.string(),
  communityExperience: z.string(),
  uncertainty: z.string(),
  relatedTopics: z.array(z.string()).optional(),
  stage: z.string().optional(), // question lifecycle stage for grouping
  searchIntent: z.enum([
    'INFORMATIONAL',
    'PROBLEM',
    'SOLUTION',
    'COMPARISON',
    'EXPERIENCE',
    'TIMELINE',
    'RELAPSE',
    'MEDICAL',
    'COMMERCIAL',
  ]),
  metadata: metadataDefinition(),
});

const experience = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/experiences' }), schema: experienceSchema });
const research = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/research' }), schema: researchSchema });
const trigger = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/triggers' }), schema: triggerSchema });
const method = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/methods' }), schema: methodSchema });
const withdrawal = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/withdrawal' }), schema: withdrawalSchema });
const relapse = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/relapse' }), schema: relapseSchema });
const timeline = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/timeline' }), schema: timelineSchema });
const pattern = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/patterns' }), schema: patternSchema });
const question = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/questions' }), schema: questionSchema });

export const collections = {
  experience,
  research,
  trigger,
  method,
  withdrawal,
  relapse,
  timeline,
  pattern,
  question,
};
