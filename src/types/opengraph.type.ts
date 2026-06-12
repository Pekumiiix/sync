export interface OgImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
}

export interface TwitterCard {
  card: string;
  site: string;
  creator: string;
  title: string;
  description: string;
  image: string;
}

export interface AnalysisIssue {
  severity: 'info' | 'warning' | 'error';
  category: string;
  slug: string;
  title: string;
  description: string;
}

export interface OgAnalysis {
  score: number;
  summary: string;
  issues: AnalysisIssue[];
}

export interface IOpenGraphResponse {
  url: string;
  title: string;
  description: string;
  siteName: string;
  type: string;
  locale: string;
  image: OgImage;
  twitter: TwitterCard;
  favicon: string;
  canonical: string;
  analysis: OgAnalysis;
  suggestedTags: string;
}
