/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  comments: string;
  serviceInterest: string; // e.g. "Patrimonio", "Tributaria", "Seguros", "Crédito", "Otro"
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
  // Diagnostic responses if submitted through the interactive quiz
  diagnostic?: {
    profileType: string;
    score: number;
    answers: Record<string, string>;
  };
}

export interface Alliance {
  id: string;
  name: string;
  sector: 'Financial' | 'Asegurador' | 'Jurídico' | 'Empresarial';
  logoPlaceholder: string; // descriptive symbol or monogram
}

export interface ServiceDetail {
  id: string;
  title: string;
  icon: string; // lucide icon identifier
  shortDescription: string;
  longDescription: string;
  keyBenefits: string[];
  subServices: string[];
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    rating: number; // impact rating
    desc: string;
  }[];
}
