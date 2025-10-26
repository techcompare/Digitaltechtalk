export interface Tool {
  name: string;
  description: string;
  category: string;
  websiteUrl: string;
  icon: string;
  pricing: string;
}

export interface GroundingChunk {
  web?: {
    // FIX: Made uri and title optional to align with the @google/genai library's GroundingChunk type.
    uri?: string;
    title?: string;
  };
}
