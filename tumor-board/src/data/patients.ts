// ══════════════════════════════════════════════════════════
// Tumor Board Virtuel — Données complètes
// Hackathon UNBOXED (GE Healthcare × Centrale Lyon)
// ══════════════════════════════════════════════════════════

// ─── Interfaces ──────────────────────────────────────────

export interface Finding {
  id: string;
  description: string;
  taille_actuelle: string;
  taille_precedente?: string;
  evolution?: string;
  classification: string;
  alerte: boolean;
}

export interface RapportSection {
  titre: string;
  contenu: string;
}

export interface AgentReport {
  organe: string;
  icone: string;
  agent_name: string;
  status: "progression" | "stable" | "regression" | "nouveau" | "normal";
  resume_court: string;
  standard_medical: string;
  findings: Finding[];
  rapport: RapportSection[];
  metriques: {
    classification?: string;
    classification_label?: string;
    classification_color?: string;
    vdt?: { valeur: number; interpretation: string; alerte: boolean };
    confidence_scores?: { finding: string; score: number; max: number }[];
    donnees_manquantes?: string[];
    verification?: { verifiees: number; corrigees: number; non_resolues: number };
  };
}

export interface Correlation {
  type: "alerte" | "attention" | "info";
  icone: string;
  titre: string;
  description: string;
}

export interface TumorBoardSynthesis {
  evaluation_globale: string;
  evaluation_color: string;
  correlations: Correlation[];
  points_discussion: string[];
  recommandations: string[];
  elements_manquants: string[];
  conclusion: string;
}

export interface TimelineEntry {
  date: string;
  examen: string;
  organes: {
    organe: string;
    resume: string;
    status: "progression" | "stable" | "regression" | "nouveau" | "normal" | "absent";
  }[];
}

export interface Patient {
  id: string;
  age: number;
  sexe: "Homme" | "Femme";
  diagnostic_principal: string;
  traitement_en_cours: string;
  date_diagnostic: string;
  nombre_examens: number;
  urgence: "critique" | "attention" | "stable";
  organes_concernes: string[];
  resume_worklist: string;
  contexte: string;
  agents: AgentReport[];
  synthese_tumor_board: TumorBoardSynthesis;
  timeline: TimelineEntry[];
}

export interface AgentDefinition {
  name: string;
  role: string;
  icone: string;
  couleur: string;
  couche: "specialiste" | "support" | "orchestrateur";
  outils_mcp: string[];
  standards: string[];
  description: string;
}

export interface MCPConnection {
  from: string;
  to: string;
  protocol: string;
  type: string;
}

// ─── Patient 1 — Cas critique (CBNPC, progression multi-sites) ───

const patient1: Patient = {
  id: "063F6BB9",
  age: 51,
  sexe: "Homme",
  diagnostic_principal: "Carcinome bronchique non à petites cellules (CBNPC)",
  traitement_en_cours: "Pembrolizumab (immunothérapie) — 3ème cycle",
  date_diagnostic: "Octobre 2025",
  nombre_examens: 3,
  urgence: "critique",
  organes_concernes: ["poumons", "foie", "ganglions", "os"],
  resume_worklist: "Progression multi-sites sous immunothérapie — nouvelles métastases hépatiques",
  contexte: "Patient de 51 ans suivi pour un CBNPC diagnostiqué en octobre 2025, sous immunothérapie par Pembrolizumab depuis décembre 2025 (3ème cycle). Le scanner de contrôle d'avril 2026 montre une progression pulmonaire avec apparition de métastases hépatiques et progression ganglionnaire médiastinale, suggérant un échec de l'immunothérapie de première ligne.",

  agents: [
    // ── Agent Thorax ──
    {
      organe: "poumons",
      icone: "🫁",
      agent_name: "Agent Thorax",
      status: "progression",
      resume_court: "Progression pulmonaire — F1 +28.6%, somme des cibles en augmentation. PD (RECIST 1.1).",
      standard_medical: "RECIST 1.1",
      findings: [
        {
          id: "F1",
          description: "Nodule lobe supérieur droit",
          taille_actuelle: "27.4mm",
          taille_precedente: "21.3mm",
          evolution: "+28.6%",
          classification: "Cible",
          alerte: true,
        },
        {
          id: "F2",
          description: "Nodule lobe inférieur droit",
          taille_actuelle: "14.7mm",
          taille_precedente: "13.6mm",
          evolution: "+8.1%",
          classification: "Cible",
          alerte: false,
        },
        {
          id: "F3",
          description: "Nodule lobe inférieur gauche",
          taille_actuelle: "10.7mm",
          taille_precedente: "13.2mm",
          evolution: "-18.9%",
          classification: "Cible",
          alerte: false,
        },
        {
          id: "F4",
          description: "Micronodule lobe moyen",
          taille_actuelle: "9.2mm",
          taille_precedente: "9.4mm",
          evolution: "-2.1%",
          classification: "Non-cible",
          alerte: false,
        },
      ],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Bilan de réévaluation sous immunothérapie (Pembrolizumab, 3ème cycle) pour un CBNPC diagnostiqué en octobre 2025. Troisième scanner TAP de suivi.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Scanner thoraco-abdomino-pelvien avec injection de produit de contraste iodé. Acquisitions en phase portale. Coupes millimétriques avec reconstructions axiales, coronales et sagittales.",
        },
        {
          titre: "RÉSULTATS",
          contenu:
            "Nodule du lobe supérieur droit mesuré à 27.4mm de grand axe, en progression par rapport à l'examen antérieur (21.3mm au diagnostic, 20.5mm à l'examen intermédiaire, soit +28.6% vs baseline). Classé lésion cible.\n\nNodule du lobe inférieur droit mesuré à 14.7mm, discrètement augmenté par rapport au baseline (13.6mm, +8.1%). Classé lésion cible.\n\nNodule du lobe inférieur gauche mesuré à 10.7mm, en régression par rapport au baseline (13.2mm, -18.9%). Classé lésion cible.\n\nMicronodule du lobe moyen mesuré à 9.2mm, stable (9.4mm au baseline, -2.1%). Inférieur à 10mm, classé lésion non-cible.",
        },
        {
          titre: "CLASSIFICATION RECIST 1.1",
          contenu:
            "Somme des lésions cibles baseline : 21.3 + 13.6 + 13.2 = 48.1mm.\nSomme des lésions cibles nadir (Fév 2026) : 20.5 + 13.0 + 12.8 = 46.3mm.\nSomme des lésions cibles actuelle : 27.4 + 14.7 + 10.7 = 52.8mm.\nVariation vs nadir : +14.0%.\n\nLe Finding F1 présente une augmentation absolue ≥ 5mm (27.4 − 20.5 = +6.9mm). Par ailleurs, apparition de nouvelles lésions hépatiques (cf. rapport hépatique). Critère de nouvelle lésion atteint.\n\nClassification globale : Progressive Disease (PD).\nMotif principal : apparition de nouvelles lésions hépatiques = PD automatique (RECIST 1.1, critère new lesion).",
        },
        {
          titre: "CONCLUSION",
          contenu:
            "Progression tumorale pulmonaire avec augmentation significative du nodule du lobe supérieur droit (F1, +28.6%). Réponse hétérogène : régression de F3 (-18.9%) contrastant avec la progression de F1. Classification RECIST 1.1 : Progressive Disease (PD), principalement motivée par l'apparition de nouvelles lésions hépatiques.",
        },
        {
          titre: "LIMITATIONS",
          contenu:
            "Localisation précise sous-segmentaire non détaillée. Mesures de densité (UH) non rapportées. Caractérisation du rehaussement non réalisée. Les mesures sont unidimensionnelles (grand axe) conformément au protocole RECIST 1.1.",
        },
      ],
      metriques: {
        classification: "PD (new lesion)",
        classification_label: "Progressive Disease",
        classification_color: "red",
        vdt: {
          valeur: 113,
          interpretation: "Temps de doublement tumoral rapide, hautement suspect de malignité (seuil : < 400 jours)",
          alerte: true,
        },
        confidence_scores: [
          { finding: "F1", score: 8, max: 8 },
          { finding: "F2", score: 7, max: 8 },
          { finding: "F3", score: 7, max: 8 },
          { finding: "F4", score: 5, max: 8 },
        ],
        donnees_manquantes: [
          "Localisation sous-segmentaire précise",
          "Mesures de densité (UH) pré et post-injection",
          "Caractérisation du rehaussement",
        ],
        verification: { verifiees: 3, corrigees: 1, non_resolues: 0 },
      },
    },

    // ── Agent Hépatique ──
    {
      organe: "foie",
      icone: "🟤",
      agent_name: "Agent Hépatique",
      status: "progression",
      resume_court: "Deux lésions hépatiques nouvelles (18mm et 12mm) — métastases. PD (RECIST 1.1).",
      standard_medical: "RECIST 1.1",
      findings: [
        {
          id: "H1",
          description: "Lésion hypodense segment VII",
          taille_actuelle: "18mm",
          taille_precedente: "8mm",
          evolution: "+125.0%",
          classification: "Nouveau",
          alerte: true,
        },
        {
          id: "H2",
          description: "Lésion hypodense segment IV",
          taille_actuelle: "12mm",
          classification: "Nouveau",
          alerte: true,
        },
      ],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Bilan de réévaluation hépatique dans le cadre du suivi d'un CBNPC sous immunothérapie. Recherche de localisations secondaires hépatiques.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Scanner thoraco-abdomino-pelvien avec injection de produit de contraste iodé. Acquisitions en phase portale. Coupes millimétriques avec reconstructions axiales et coronales.",
        },
        {
          titre: "RÉSULTATS",
          contenu:
            "Lésion hypodense du segment VII mesurant 18mm de grand axe, apparue à l'examen de février 2026 (8mm) et en nette progression. Non présente sur l'examen de référence de décembre 2025. Compatible avec une localisation secondaire.\n\nLésion hypodense du segment IV mesurant 12mm, non présente sur les examens antérieurs (décembre 2025 et février 2026). Nouvelle lésion suspecte de métastase.\n\nPas d'autre lésion focale hépatique suspecte. Voies biliaires non dilatées. Veine porte perméable.",
        },
        {
          titre: "CLASSIFICATION RECIST 1.1",
          contenu:
            "Deux lésions hépatiques nouvelles, non présentes sur l'examen de référence. L'apparition de nouvelles lésions constitue un critère de Progressive Disease (PD) selon RECIST 1.1, indépendamment de l'évolution des lésions cibles.\n\nNote : RECIST 1.1 standard appliqué (métastases hépatiques d'un CBNPC). Le mRECIST n'est pas applicable ici (réservé au carcinome hépatocellulaire primitif).",
        },
        {
          titre: "CONCLUSION",
          contenu:
            "Deux lésions hypodenses hépatiques, segment VII (18mm) et segment IV (12mm), non présentes sur l'examen de référence. Compatible avec des localisations secondaires dans ce contexte de CBNPC. Classification RECIST 1.1 : Progressive Disease (nouvelles lésions).",
        },
        {
          titre: "LIMITATIONS",
          contenu:
            "Type de rehaussement non caractérisé (acquisition en phase portale uniquement). IRM hépatique non réalisée pour caractérisation complète. Biopsie non encore effectuée.",
        },
      ],
      metriques: {
        classification: "PD (new lesion)",
        classification_label: "Progressive Disease",
        classification_color: "red",
        confidence_scores: [
          { finding: "H1", score: 6, max: 8 },
          { finding: "H2", score: 5, max: 8 },
        ],
        donnees_manquantes: [
          "Type de rehaussement (phases artérielle et tardive)",
          "Caractérisation complète par IRM hépatique",
          "Confirmation histologique (biopsie)",
        ],
        verification: { verifiees: 2, corrigees: 0, non_resolues: 0 },
      },
    },

    // ── Agent Ganglionnaire ──
    {
      organe: "ganglions",
      icone: "🟣",
      agent_name: "Agent Ganglionnaire",
      status: "progression",
      resume_court: "Adénopathie médiastinale sous-carénaire 14mm (petit axe) — passage au-dessus du seuil pathologique.",
      standard_medical: "RECIST 1.1 — petit axe",
      findings: [
        {
          id: "G1",
          description: "Adénopathie médiastinale sous-carénaire (station 7)",
          taille_actuelle: "14mm",
          taille_precedente: "8mm",
          evolution: "+75.0%",
          classification: "Cible",
          alerte: true,
        },
      ],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Évaluation ganglionnaire dans le cadre du suivi d'un CBNPC sous immunothérapie par Pembrolizumab.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Scanner thoraco-abdomino-pelvien avec injection de produit de contraste iodé. Mesure du petit axe ganglionnaire selon les recommandations RECIST 1.1.",
        },
        {
          titre: "RÉSULTATS",
          contenu:
            "Adénopathie médiastinale sous-carénaire (station 7) mesurant 14mm de petit axe, en progression par rapport aux examens antérieurs (8mm en décembre 2025, 9mm en février 2026). Dépassement du seuil pathologique de 10mm (RECIST 1.1).\n\nPas d'autre adénopathie supra ou infra-centimétrique suspecte dans les territoires médiastinaux, hilaires ou axillaires explorés.",
        },
        {
          titre: "CLASSIFICATION RECIST 1.1",
          contenu:
            "Selon RECIST 1.1, les ganglions lymphatiques sont mesurés sur le petit axe. Un ganglion ≥ 10mm de petit axe est considéré comme pathologique et peut être classé lésion cible.\n\nL'adénopathie sous-carénaire, initialement infra-seuil (8mm), atteint désormais 14mm et est reclassée comme lésion cible en progression.",
        },
        {
          titre: "CONCLUSION",
          contenu:
            "Progression ganglionnaire médiastinale avec adénopathie sous-carénaire passant au-dessus du seuil pathologique (8mm → 14mm). À corréler avec la progression pulmonaire et l'apparition de métastases hépatiques.",
        },
        {
          titre: "LIMITATIONS",
          contenu:
            "Mesure du petit axe ganglionnaire dépendante de l'orientation de la coupe. Reproductibilité inter-observateur modérée pour les ganglions proches du seuil. PET-scan non réalisé pour évaluation métabolique.",
        },
      ],
      metriques: {
        classification: "PD",
        classification_label: "Progressive Disease",
        classification_color: "red",
        confidence_scores: [{ finding: "G1", score: 6, max: 8 }],
        donnees_manquantes: [
          "PET-scan pour évaluation métabolique",
          "Analyse cytologique (ponction ganglionnaire)",
        ],
        verification: { verifiees: 1, corrigees: 0, non_resolues: 0 },
      },
    },

    // ── Agent Osseux ──
    {
      organe: "os",
      icone: "🦴",
      agent_name: "Agent Osseux",
      status: "normal",
      resume_court: "Pas de lésion osseuse suspecte détectée. Structures osseuses d'aspect normal.",
      standard_medical: "Qualitatif",
      findings: [],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Recherche de métastases osseuses dans le cadre du suivi d'un CBNPC en progression.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Analyse des structures osseuses visibles sur le scanner TAP en fenêtre osseuse. Coupes axiales millimétriques avec reconstructions sagittales et coronales.",
        },
        {
          titre: "RÉSULTATS",
          contenu:
            "Structures osseuses d'aspect normal dans les limites de l'exploration (rachis thoraco-lombaire, gril costal, sternum, bassin, ceintures scapulaires). Pas de lésion ostéolytique ou ostéocondensante suspecte. Pas de tassement vertébral récent.",
        },
        {
          titre: "CONCLUSION",
          contenu:
            "Absence de lésion osseuse suspecte sur le scanner. À noter que le scanner a une sensibilité limitée pour les métastases osseuses précoces ; un PET-scan ou une scintigraphie osseuse serait plus sensible en cas de suspicion clinique.",
        },
        {
          titre: "LIMITATIONS",
          contenu:
            "Le scanner a une sensibilité limitée pour la détection des métastases osseuses, notamment les lésions ostéoblastiques infra-centimétriques et les lésions médullaires pures. PET-scan ou scintigraphie osseuse recommandés pour bilan d'extension complet.",
        },
      ],
      metriques: {
        classification: "Pas de lésion",
        classification_label: "Normal",
        classification_color: "gray",
        donnees_manquantes: [
          "PET-scan ou scintigraphie osseuse pour bilan complet",
        ],
        verification: { verifiees: 0, corrigees: 0, non_resolues: 0 },
      },
    },
  ],

  synthese_tumor_board: {
    evaluation_globale: "Progressive Disease — Progression multi-sites",
    evaluation_color: "red",
    correlations: [
      {
        type: "alerte",
        icone: "🔴",
        titre: "Progression pulmonaire avec apparition de métastases hépatiques — Dissémination systémique confirmée",
        description:
          "Le Finding F1 pulmonaire progresse de +28.6% avec un VDT de 113 jours (croissance agressive). Simultanément, apparition de 2 lésions hépatiques nouvelles (segment VII : 18mm, segment IV : 12mm). Ce pattern indique un échec de l'immunothérapie avec dissémination métastatique.",
      },
      {
        type: "alerte",
        icone: "⚠️",
        titre: "VDT Finding F1 = 113 jours — Croissance tumorale rapide",
        description:
          "Un volume doubling time inférieur à 400 jours est considéré suspect de malignité. À 113 jours, la croissance est particulièrement agressive et suggère une biologie tumorale défavorable. Ce paramètre est un facteur pronostique péjoratif.",
      },
      {
        type: "attention",
        icone: "🟡",
        titre: "Adénopathie médiastinale en progression (8 → 14mm)",
        description:
          "Le ganglion sous-carénaire (station 7) a dépassé le seuil pathologique de 10mm (petit axe). Progression de +75% par rapport au baseline. À corréler avec la progression pulmonaire homolatérale, suggérant un drainage lymphatique tumoral actif.",
      },
      {
        type: "info",
        icone: "ℹ️",
        titre: "Finding F3 pulmonaire en régression (-18.9%)",
        description:
          "Malgré la progression globale, le nodule du lobe inférieur gauche (F3) régresse de 13.2mm à 10.7mm. Ce pattern de réponse hétérogène est fréquent sous immunothérapie et peut traduire une hétérogénéité tumorale intra-patient avec des clones répondeurs et non-répondeurs.",
      },
    ],
    points_discussion: [
      "Échec de l'immunothérapie de 1ère ligne — discuter passage en 2ème ligne (chimiothérapie à base de platine ± anti-angiogénique)",
      "Biopsie de la lésion hépatique la plus accessible (segment VII, 18mm) pour analyse moléculaire (recherche PDL1, mutations EGFR, ALK, ROS1, KRAS)",
      "Réponse hétérogène (F3 en régression, F1 en progression) — envisager un traitement local de F1 (radiothérapie stéréotaxique) en complément du traitement systémique ?",
      "PET-scan recommandé pour bilan d'extension complet avant changement de ligne thérapeutique",
    ],
    recommandations: [
      "Bilan d'extension par PET-FDG corps entier",
      "Biopsie hépatique avec analyse moléculaire complète",
      "Discussion changement de ligne thérapeutique en RCP",
      "Scanner de contrôle à 6 semaines après changement de traitement",
    ],
    elements_manquants: [
      "PET-scan non réalisé",
      "Marqueurs tumoraux (ACE, CYFRA 21-1) non disponibles",
      "Statut moléculaire tumoral incomplet (PDL1 à refaire sur métastase)",
      "Biopsie hépatique non encore réalisée",
    ],
    conclusion:
      "Patient présentant une progression multi-sites sous immunothérapie de 1ère ligne avec apparition de métastases hépatiques et progression ganglionnaire médiastinale. Le VDT rapide (113 jours) et la dissémination hépatique suggèrent un changement de stratégie thérapeutique urgent. Discussion en RCP recommandée dans un délai de 7 jours.",
  },

  timeline: [
    {
      date: "Déc 2025",
      examen: "CT TAP — Bilan initial",
      organes: [
        { organe: "poumons", resume: "4 nodules pulmonaires (21.3, 13.6, 13.2, 9.4mm)", status: "nouveau" },
        { organe: "foie", resume: "Pas de lésion hépatique", status: "normal" },
        { organe: "ganglions", resume: "Adénopathie sous-carénaire 8mm (infra-seuil)", status: "normal" },
        { organe: "os", resume: "Normal", status: "normal" },
      ],
    },
    {
      date: "Fév 2026",
      examen: "CT TAP — Contrôle C2",
      organes: [
        { organe: "poumons", resume: "4 nodules stables (20.5, 13.0, 12.8, 9.3mm)", status: "stable" },
        { organe: "foie", resume: "1 lésion apparue (8mm, segment VII)", status: "nouveau" },
        { organe: "ganglions", resume: "Adénopathie 9mm (infra-seuil)", status: "stable" },
        { organe: "os", resume: "Normal", status: "normal" },
      ],
    },
    {
      date: "Avr 2026",
      examen: "CT TAP — Contrôle C3",
      organes: [
        { organe: "poumons", resume: "4 nodules (27.4, 14.7, 10.7, 9.2mm) — F1 en progression", status: "progression" },
        { organe: "foie", resume: "2 lésions (18mm + 12mm nouveau)", status: "progression" },
        { organe: "ganglions", resume: "Adénopathie 14mm (> seuil 10mm)", status: "progression" },
        { organe: "os", resume: "Normal", status: "normal" },
      ],
    },
  ],
};

// ─── Patient 2 — Réponse partielle (bonne réponse) ──────

const patient2: Patient = {
  id: "A1B2C3D4",
  age: 68,
  sexe: "Femme",
  diagnostic_principal: "Carcinome bronchique non à petites cellules (CBNPC)",
  traitement_en_cours: "Carboplatine-Pemetrexed (chimiothérapie) — 4ème cycle",
  date_diagnostic: "Juillet 2025",
  nombre_examens: 2,
  urgence: "stable",
  organes_concernes: ["poumons", "foie", "ganglions", "os"],
  resume_worklist: "Réponse partielle confirmée sous chimiothérapie — régression tumorale significative",
  contexte: "Patiente de 68 ans suivie pour un CBNPC diagnostiqué en juillet 2025, sous chimiothérapie par Carboplatine-Pemetrexed depuis septembre 2025. Le scanner de contrôle de février 2026 montre une réponse partielle avec régression significative des lésions pulmonaires et ganglionnaires.",

  agents: [
    // ── Agent Thorax ──
    {
      organe: "poumons",
      icone: "🫁",
      agent_name: "Agent Thorax",
      status: "regression",
      resume_court: "Réponse partielle — régression de -43.8% (F1) et -40.0% (F2). PR (RECIST 1.1).",
      standard_medical: "RECIST 1.1",
      findings: [
        {
          id: "F1",
          description: "Masse lobe supérieur gauche",
          taille_actuelle: "18mm",
          taille_precedente: "32mm",
          evolution: "-43.8%",
          classification: "Cible",
          alerte: false,
        },
        {
          id: "F2",
          description: "Nodule lobe inférieur gauche",
          taille_actuelle: "9mm",
          taille_precedente: "15mm",
          evolution: "-40.0%",
          classification: "Cible",
          alerte: false,
        },
      ],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Bilan de réévaluation sous chimiothérapie (Carboplatine-Pemetrexed, 4ème cycle) pour un CBNPC diagnostiqué en juillet 2025. Deuxième scanner TAP de suivi.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Scanner thoraco-abdomino-pelvien avec injection de produit de contraste iodé. Acquisitions en phase portale. Coupes millimétriques avec reconstructions multiplanaires.",
        },
        {
          titre: "RÉSULTATS",
          contenu:
            "Masse du lobe supérieur gauche mesurant 18mm de grand axe, en nette régression par rapport à l'examen de référence (32mm, -43.8%). Classée lésion cible.\n\nNodule du lobe inférieur gauche mesurant 9mm, en régression par rapport au baseline (15mm, -40.0%). Classé lésion cible.\n\nPas d'apparition de nouvelle lésion pulmonaire.",
        },
        {
          titre: "CLASSIFICATION RECIST 1.1",
          contenu:
            "Somme des lésions cibles baseline : 32 + 15 = 47mm.\nSomme des lésions cibles actuelle : 18 + 9 = 27mm.\nVariation : -42.5% (seuil PR ≤ -30%).\n\nClassification : Partial Response (PR).",
        },
        {
          titre: "CONCLUSION",
          contenu:
            "Réponse partielle confirmée selon RECIST 1.1 avec régression significative des deux lésions cibles (-42.5%). Pas de nouvelle lésion. Bonne réponse thérapeutique au protocole Carboplatine-Pemetrexed.",
        },
        {
          titre: "LIMITATIONS",
          contenu: "Mesures unidimensionnelles selon RECIST 1.1. Évaluation volumétrique non réalisée.",
        },
      ],
      metriques: {
        classification: "PR -42.5%",
        classification_label: "Partial Response",
        classification_color: "green",
        confidence_scores: [
          { finding: "F1", score: 8, max: 8 },
          { finding: "F2", score: 7, max: 8 },
        ],
        donnees_manquantes: [
          "Évaluation volumétrique complémentaire",
        ],
        verification: { verifiees: 2, corrigees: 0, non_resolues: 0 },
      },
    },

    // ── Agent Hépatique ──
    {
      organe: "foie",
      icone: "🟤",
      agent_name: "Agent Hépatique",
      status: "normal",
      resume_court: "Pas de lésion hépatique suspecte. Parenchyme hépatique homogène.",
      standard_medical: "RECIST 1.1",
      findings: [],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Recherche de localisations secondaires hépatiques dans le cadre du suivi d'un CBNPC sous chimiothérapie.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Scanner thoraco-abdomino-pelvien avec injection de produit de contraste iodé. Acquisitions en phase portale.",
        },
        {
          titre: "RÉSULTATS",
          contenu:
            "Parenchyme hépatique homogène, sans lésion focale suspecte. Voies biliaires non dilatées. Veine porte perméable. Pas d'ascite.",
        },
        {
          titre: "CONCLUSION",
          contenu: "Absence de localisation secondaire hépatique. Examen hépatique normal.",
        },
      ],
      metriques: {
        classification: "Pas de lésion",
        classification_label: "Normal",
        classification_color: "gray",
        verification: { verifiees: 0, corrigees: 0, non_resolues: 0 },
      },
    },

    // ── Agent Ganglionnaire ──
    {
      organe: "ganglions",
      icone: "🟣",
      agent_name: "Agent Ganglionnaire",
      status: "regression",
      resume_court: "Adénopathie hilaire droite 8mm (était 16mm) — passage sous le seuil pathologique. Bonne réponse.",
      standard_medical: "RECIST 1.1 — petit axe",
      findings: [
        {
          id: "G1",
          description: "Adénopathie hilaire droite",
          taille_actuelle: "8mm",
          taille_precedente: "16mm",
          evolution: "-50.0%",
          classification: "Cible",
          alerte: false,
        },
      ],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Évaluation ganglionnaire de contrôle sous chimiothérapie pour CBNPC.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Scanner thoraco-abdomino-pelvien avec injection de produit de contraste iodé. Mesure du petit axe ganglionnaire.",
        },
        {
          titre: "RÉSULTATS",
          contenu:
            "Adénopathie hilaire droite mesurant 8mm de petit axe, en nette régression par rapport au baseline (16mm, -50.0%). Passage sous le seuil pathologique de 10mm. Pas d'autre adénopathie suspecte.",
        },
        {
          titre: "CLASSIFICATION RECIST 1.1",
          contenu:
            "Le ganglion hilaire droit a régressé sous le seuil de 10mm (petit axe). Selon RECIST 1.1, un ganglion < 10mm de petit axe est considéré comme non pathologique. Réponse ganglionnaire favorable.",
        },
        {
          titre: "CONCLUSION",
          contenu: "Bonne réponse ganglionnaire avec passage sous le seuil pathologique. Adénopathie hilaire droite considérée comme non pathologique (8mm).",
        },
      ],
      metriques: {
        classification: "PR -50.0%",
        classification_label: "Partial Response",
        classification_color: "green",
        confidence_scores: [{ finding: "G1", score: 7, max: 8 }],
        verification: { verifiees: 1, corrigees: 0, non_resolues: 0 },
      },
    },

    // ── Agent Osseux ──
    {
      organe: "os",
      icone: "🦴",
      agent_name: "Agent Osseux",
      status: "normal",
      resume_court: "Pas de lésion osseuse suspecte. Structures osseuses d'aspect normal.",
      standard_medical: "Qualitatif",
      findings: [],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Recherche de métastases osseuses dans le cadre du suivi d'un CBNPC.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Analyse des structures osseuses en fenêtre osseuse sur le scanner TAP.",
        },
        {
          titre: "RÉSULTATS",
          contenu: "Structures osseuses d'aspect normal. Pas de lésion ostéolytique ou ostéocondensante suspecte. Pas de tassement vertébral.",
        },
        {
          titre: "CONCLUSION",
          contenu: "Absence de lésion osseuse suspecte.",
        },
      ],
      metriques: {
        classification: "Pas de lésion",
        classification_label: "Normal",
        classification_color: "gray",
        verification: { verifiees: 0, corrigees: 0, non_resolues: 0 },
      },
    },
  ],

  synthese_tumor_board: {
    evaluation_globale: "Partial Response — Réponse partielle confirmée",
    evaluation_color: "green",
    correlations: [
      {
        type: "info",
        icone: "✅",
        titre: "Réponse thérapeutique favorable sur toutes les localisations",
        description:
          "Régression significative des lésions pulmonaires cibles (-42.5%) et de l'adénopathie hilaire droite (-50.0%, passage sous le seuil pathologique). Pas d'apparition de nouvelle lésion. Le protocole Carboplatine-Pemetrexed montre une efficacité satisfaisante.",
      },
      {
        type: "info",
        icone: "✅",
        titre: "Adénopathie hilaire passée sous le seuil pathologique",
        description:
          "Le ganglion hilaire droit est passé de 16mm à 8mm (petit axe), sous le seuil de 10mm. Selon RECIST 1.1, ce ganglion n'est plus considéré comme pathologique, témoignant d'une bonne réponse ganglionnaire.",
      },
      {
        type: "info",
        icone: "ℹ️",
        titre: "Absence de métastase à distance",
        description:
          "Aucune lésion hépatique ni osseuse détectée. Pas de signe de dissémination systémique. La maladie reste locorégionale avec une réponse favorable au traitement.",
      },
    ],
    points_discussion: [
      "Nombre de cycles de chimiothérapie restants à définir (habituellement 4 à 6 cycles au total)",
      "Discussion de la maintenance par Pemetrexed seul après la phase d'induction",
      "Scanner de contrôle à planifier dans 3 mois pour confirmer la réponse",
      "Discuter l'indication d'une radiothérapie de consolidation sur le résidu pulmonaire",
    ],
    recommandations: [
      "Poursuite du protocole Carboplatine-Pemetrexed (cycles restants à définir)",
      "Scanner TAP de contrôle dans 3 mois",
      "Discussion maintenance par Pemetrexed en monothérapie",
      "Surveillance clinique et biologique standard",
    ],
    elements_manquants: [
      "Nombre total de cycles prévu non précisé",
      "Marqueurs tumoraux de suivi (ACE, CYFRA 21-1) non disponibles",
      "Bilan de tolérance de la chimiothérapie non renseigné",
    ],
    conclusion:
      "Patiente présentant une réponse partielle confirmée (RECIST 1.1) sous chimiothérapie par Carboplatine-Pemetrexed avec régression significative des lésions pulmonaires et ganglionnaires. Pas de nouvelle lésion. Poursuite du traitement recommandée avec planification de la phase de maintenance.",
  },

  timeline: [
    {
      date: "Oct 2025",
      examen: "CT TAP — Bilan initial (baseline)",
      organes: [
        { organe: "poumons", resume: "2 lésions cibles (32mm, 15mm)", status: "nouveau" },
        { organe: "foie", resume: "Pas de lésion", status: "normal" },
        { organe: "ganglions", resume: "Adénopathie hilaire droite 16mm", status: "nouveau" },
        { organe: "os", resume: "Normal", status: "normal" },
      ],
    },
    {
      date: "Fév 2026",
      examen: "CT TAP — Contrôle C4",
      organes: [
        { organe: "poumons", resume: "Régression (18mm, 9mm) — PR -42.5%", status: "regression" },
        { organe: "foie", resume: "Pas de lésion", status: "normal" },
        { organe: "ganglions", resume: "Adénopathie 8mm (sous seuil pathologique)", status: "regression" },
        { organe: "os", resume: "Normal", status: "normal" },
      ],
    },
  ],
};

// ─── Patient 3 — Maladie stable (cas intermédiaire) ─────

const patient3: Patient = {
  id: "E5F6G7H8",
  age: 73,
  sexe: "Homme",
  diagnostic_principal: "Adénocarcinome pulmonaire — Stade IIIB",
  traitement_en_cours: "Radiochimiothérapie concomitante (Cisplatine-Étoposide + RT 66 Gy)",
  date_diagnostic: "Novembre 2025",
  nombre_examens: 2,
  urgence: "attention",
  organes_concernes: ["poumons", "foie", "ganglions", "os"],
  resume_worklist: "Maladie stable sous radiochimiothérapie — F2 à surveiller (+9.1%)",
  contexte: "Patient de 73 ans suivi pour un adénocarcinome pulmonaire de stade IIIB, sous radiochimiothérapie concomitante depuis décembre 2025. Le scanner de contrôle de mars 2026 montre une maladie globalement stable avec cependant une légère augmentation de F2 à surveiller.",

  agents: [
    // ── Agent Thorax ──
    {
      organe: "poumons",
      icone: "🫁",
      agent_name: "Agent Thorax",
      status: "stable",
      resume_court: "Maladie stable — variation dans les seuils RECIST. F2 à surveiller (+9.1%). SD (RECIST 1.1).",
      standard_medical: "RECIST 1.1",
      findings: [
        {
          id: "F1",
          description: "Masse hilaire droite",
          taille_actuelle: "42mm",
          taille_precedente: "45mm",
          evolution: "-6.7%",
          classification: "Cible",
          alerte: false,
        },
        {
          id: "F2",
          description: "Nodule lobe supérieur droit",
          taille_actuelle: "24mm",
          taille_precedente: "22mm",
          evolution: "+9.1%",
          classification: "Cible",
          alerte: false,
        },
        {
          id: "F3",
          description: "Micronodule lingula",
          taille_actuelle: "8mm",
          taille_precedente: "8mm",
          evolution: "0%",
          classification: "Non-cible",
          alerte: false,
        },
      ],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Bilan de réévaluation sous radiochimiothérapie concomitante pour un adénocarcinome pulmonaire stade IIIB. Deuxième scanner de suivi.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Scanner thoraco-abdomino-pelvien avec injection de produit de contraste iodé. Acquisitions en phase portale. Coupes millimétriques.",
        },
        {
          titre: "RÉSULTATS",
          contenu:
            "Masse hilaire droite mesurant 42mm de grand axe, discrètement diminuée par rapport au baseline (45mm, -6.7%). Classée lésion cible.\n\nNodule du lobe supérieur droit mesurant 24mm, discrètement augmenté par rapport au baseline (22mm, +9.1%), restant dans les limites de la maladie stable (seuil PD : +20%). Classé lésion cible. À surveiller.\n\nMicronodule de la lingula mesurant 8mm, stable (8mm au baseline). Classé lésion non-cible.\n\nPas de nouvelle lésion parenchymateuse. Remaniements post-radiques débutants dans le champ d'irradiation.",
        },
        {
          titre: "CLASSIFICATION RECIST 1.1",
          contenu:
            "Somme des lésions cibles baseline : 45 + 22 = 67mm.\nSomme des lésions cibles actuelle : 42 + 24 = 66mm.\nVariation : -1.5% (seuils : PR ≤ -30%, PD ≥ +20%).\n\nClassification : Stable Disease (SD).",
        },
        {
          titre: "CONCLUSION",
          contenu:
            "Maladie globalement stable selon RECIST 1.1 (SD, -1.5%). La masse hilaire droite régresse discrètement tandis que le nodule du lobe supérieur droit augmente légèrement (+9.1%). Pas de nouvelle lésion. Remaniements post-radiques débutants attendus.",
        },
        {
          titre: "LIMITATIONS",
          contenu:
            "Les remaniements post-radiques peuvent gêner l'évaluation précise des lésions dans le champ d'irradiation. Mesures unidimensionnelles selon RECIST 1.1. Le micronodule F3 (8mm) est à la limite de la mesurabilité.",
        },
      ],
      metriques: {
        classification: "SD -1.5%",
        classification_label: "Stable Disease",
        classification_color: "amber",
        confidence_scores: [
          { finding: "F1", score: 8, max: 8 },
          { finding: "F2", score: 7, max: 8 },
          { finding: "F3", score: 4, max: 8 },
        ],
        donnees_manquantes: [
          "Évaluation volumétrique complémentaire",
          "Corrélation avec les remaniements post-radiques",
        ],
        verification: { verifiees: 3, corrigees: 0, non_resolues: 0 },
      },
    },

    // ── Agent Hépatique ──
    {
      organe: "foie",
      icone: "🟤",
      agent_name: "Agent Hépatique",
      status: "normal",
      resume_court: "Pas de lésion hépatique suspecte. Parenchyme hépatique homogène.",
      standard_medical: "RECIST 1.1",
      findings: [],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Recherche de localisations secondaires hépatiques dans le cadre du suivi d'un adénocarcinome pulmonaire stade IIIB.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Scanner thoraco-abdomino-pelvien avec injection de produit de contraste iodé.",
        },
        {
          titre: "RÉSULTATS",
          contenu: "Parenchyme hépatique homogène, sans lésion focale suspecte. Voies biliaires non dilatées. Veine porte perméable.",
        },
        {
          titre: "CONCLUSION",
          contenu: "Absence de localisation secondaire hépatique.",
        },
      ],
      metriques: {
        classification: "Pas de lésion",
        classification_label: "Normal",
        classification_color: "gray",
        verification: { verifiees: 0, corrigees: 0, non_resolues: 0 },
      },
    },

    // ── Agent Ganglionnaire ──
    {
      organe: "ganglions",
      icone: "🟣",
      agent_name: "Agent Ganglionnaire",
      status: "stable",
      resume_court: "Adénopathie para-aortique 16mm (était 18mm) — légère réduction, stable.",
      standard_medical: "RECIST 1.1 — petit axe",
      findings: [
        {
          id: "G1",
          description: "Adénopathie para-aortique",
          taille_actuelle: "16mm",
          taille_precedente: "18mm",
          evolution: "-11.1%",
          classification: "Cible",
          alerte: false,
        },
      ],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Évaluation ganglionnaire dans le cadre du suivi d'un adénocarcinome pulmonaire stade IIIB sous radiochimiothérapie.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Scanner thoraco-abdomino-pelvien avec injection. Mesure du petit axe ganglionnaire.",
        },
        {
          titre: "RÉSULTATS",
          contenu:
            "Adénopathie para-aortique mesurant 16mm de petit axe, en légère diminution par rapport au baseline (18mm, -11.1%). Toujours au-dessus du seuil pathologique de 10mm. Pas d'autre adénopathie suspecte.",
        },
        {
          titre: "CLASSIFICATION RECIST 1.1",
          contenu:
            "Le ganglion para-aortique reste pathologique (> 10mm de petit axe) mais présente une tendance à la régression. Variation insuffisante pour qualifier une réponse partielle au niveau ganglionnaire isolé.",
        },
        {
          titre: "CONCLUSION",
          contenu: "Adénopathie para-aortique en légère régression (18 → 16mm), restant pathologique. Maladie ganglionnaire stable.",
        },
      ],
      metriques: {
        classification: "SD -11.1%",
        classification_label: "Stable Disease",
        classification_color: "amber",
        confidence_scores: [{ finding: "G1", score: 7, max: 8 }],
        verification: { verifiees: 1, corrigees: 0, non_resolues: 0 },
      },
    },

    // ── Agent Osseux ──
    {
      organe: "os",
      icone: "🦴",
      agent_name: "Agent Osseux",
      status: "normal",
      resume_court: "Pas de lésion osseuse suspecte. Remaniements dégénératifs d'allure banale.",
      standard_medical: "Qualitatif",
      findings: [],
      rapport: [
        {
          titre: "INDICATION",
          contenu: "Recherche de métastases osseuses dans le cadre du suivi d'un adénocarcinome pulmonaire stade IIIB.",
        },
        {
          titre: "TECHNIQUE",
          contenu: "Analyse des structures osseuses en fenêtre osseuse sur le scanner TAP.",
        },
        {
          titre: "RÉSULTATS",
          contenu: "Remaniements dégénératifs rachidiens étagés d'allure banale. Pas de lésion ostéolytique ou ostéocondensante suspecte. Pas de tassement vertébral récent.",
        },
        {
          titre: "CONCLUSION",
          contenu: "Absence de lésion osseuse suspecte. Remaniements dégénératifs banals sans rapport avec la pathologie tumorale.",
        },
      ],
      metriques: {
        classification: "Pas de lésion",
        classification_label: "Normal",
        classification_color: "gray",
        verification: { verifiees: 0, corrigees: 0, non_resolues: 0 },
      },
    },
  ],

  synthese_tumor_board: {
    evaluation_globale: "Stable Disease — Maladie stable",
    evaluation_color: "amber",
    correlations: [
      {
        type: "info",
        icone: "🟡",
        titre: "Maladie globalement stable sous radiochimiothérapie",
        description:
          "La somme des lésions cibles varie de -1.5% (67mm → 66mm), dans les limites de la maladie stable selon RECIST 1.1 (seuils : PR ≤ -30%, PD ≥ +20%). L'adénopathie para-aortique régresse légèrement (-11.1%). Pas de nouvelle lésion.",
      },
      {
        type: "attention",
        icone: "⚠️",
        titre: "F2 à surveiller — augmentation de +9.1%",
        description:
          "Le nodule du lobe supérieur droit (F2) augmente de 22mm à 24mm (+9.1%). Bien que restant dans les limites de la maladie stable (< +20%), cette tendance à la progression doit être surveillée au prochain contrôle. Une progression confirmée au prochain examen pourrait reclasser le patient en PD.",
      },
      {
        type: "info",
        icone: "ℹ️",
        titre: "Remaniements post-radiques débutants",
        description:
          "Des modifications parenchymateuses débutantes sont observées dans le champ d'irradiation. Ces remaniements sont attendus et ne doivent pas être confondus avec une progression tumorale. La surveillance doit distinguer progression tumorale et pneumopathie radique.",
      },
    ],
    points_discussion: [
      "Poursuite de la radiochimiothérapie selon le protocole prévu ou modification de stratégie ?",
      "Discussion consolidation par Durvalumab (immunothérapie) après la radiochimiothérapie (essai PACIFIC)",
      "Surveillance rapprochée de F2 au prochain scanner (augmentation de +9.1%, proche du seuil)",
      "Évaluation de la tolérance au traitement chez un patient de 73 ans",
    ],
    recommandations: [
      "Poursuite du protocole de radiochimiothérapie en cours",
      "Scanner TAP de contrôle dans 6 à 8 semaines",
      "Discussion de la consolidation par Durvalumab en RCP",
      "Surveillance clinique rapprochée (tolérance, état général)",
    ],
    elements_manquants: [
      "PET-scan pour évaluation métabolique (distinguer remaniements post-radiques et progression)",
      "Bilan de tolérance de la radiochimiothérapie",
      "EFR de contrôle (capacité pulmonaire post-irradiation)",
      "Statut PDL1 tumoral pour éligibilité au Durvalumab",
    ],
    conclusion:
      "Patient présentant une maladie stable sous radiochimiothérapie concomitante (RECIST 1.1 : SD, -1.5%). Le nodule F2 est à surveiller (+9.1%). L'adénopathie para-aortique régresse légèrement. Discussion en RCP pour planifier la phase de consolidation (Durvalumab) et le rythme de surveillance.",
  },

  timeline: [
    {
      date: "Jan 2026",
      examen: "CT TAP — Bilan pré-thérapeutique",
      organes: [
        { organe: "poumons", resume: "Masse hilaire 45mm + nodule 22mm + micronodule 8mm", status: "nouveau" },
        { organe: "foie", resume: "Pas de lésion", status: "normal" },
        { organe: "ganglions", resume: "Adénopathie para-aortique 18mm", status: "nouveau" },
        { organe: "os", resume: "Remaniements dégénératifs banals", status: "normal" },
      ],
    },
    {
      date: "Mar 2026",
      examen: "CT TAP — Contrôle mi-traitement",
      organes: [
        { organe: "poumons", resume: "Stable (42mm, 24mm, 8mm) — F2 à surveiller", status: "stable" },
        { organe: "foie", resume: "Pas de lésion", status: "normal" },
        { organe: "ganglions", resume: "Adénopathie 16mm (légère réduction)", status: "stable" },
        { organe: "os", resume: "Remaniements dégénératifs banals", status: "normal" },
      ],
    },
  ],
};

// ─── Export des patients ─────────────────────────────────

export const PATIENTS: Patient[] = [patient1, patient2, patient3];

// ─── Architecture Multi-Agents ──────────────────────────

export const ARCHITECTURE_AGENTS: AgentDefinition[] = [
  {
    name: "Agent Thorax",
    role: "Analyse pulmonaire",
    icone: "🫁",
    couleur: "#3B82F6",
    couche: "specialiste",
    outils_mcp: [
      "retrieve_ct",
      "run_segmentation",
      "analyze_volume",
      "compute_recist",
      "compute_vdt",
      "generate_report",
    ],
    standards: ["RECIST 1.1", "Lung-RADS", "Fleischner"],
    description:
      "Analyse les nodules et masses pulmonaires. Segmentation 3D, mesure volumétrique, calcul RECIST et VDT, génération de rapport avec vérification anti-hallucination.",
  },
  {
    name: "Agent Hépatique",
    role: "Analyse hépatique",
    icone: "🟤",
    couleur: "#F59E0B",
    couche: "specialiste",
    outils_mcp: [
      "retrieve_ct",
      "detect_liver_lesions",
      "measure_lesions",
      "classify_lesions",
      "compute_recist",
      "generate_report",
    ],
    standards: ["RECIST 1.1", "LI-RADS"],
    description:
      "Détecte et caractérise les lésions hépatiques (métastases, CHC). Mesure automatique, classification RECIST 1.1 pour les métastases et LI-RADS pour les lésions primitives. Rapport structuré avec niveaux de confiance.",
  },
  {
    name: "Agent Ganglionnaire",
    role: "Analyse ganglionnaire",
    icone: "🟣",
    couleur: "#8B5CF6",
    couche: "specialiste",
    outils_mcp: [
      "retrieve_ct",
      "detect_lymph_nodes",
      "measure_short_axis",
      "classify_nodes",
      "compute_recist",
      "generate_report",
    ],
    standards: ["RECIST 1.1 — petit axe", "Classification TNM"],
    description:
      "Identifie et mesure les adénopathies sur le petit axe (critère RECIST 1.1). Seuil pathologique ≥ 10mm. Classification par station ganglionnaire et suivi longitudinal.",
  },
  {
    name: "Agent Osseux",
    role: "Analyse osseuse",
    icone: "🦴",
    couleur: "#6B7280",
    couche: "specialiste",
    outils_mcp: [
      "retrieve_ct",
      "detect_bone_lesions",
      "classify_lesions",
      "assess_fracture_risk",
      "generate_report",
    ],
    standards: ["Qualitatif", "PERCIST (si PET)"],
    description:
      "Recherche de métastases osseuses (lésions ostéolytiques et ostéocondensantes). Évaluation du risque fracturaire. Analyse en fenêtre osseuse avec détection automatique des anomalies.",
  },
  {
    name: "Agent RAG / Guidelines",
    role: "Référentiels médicaux",
    icone: "📚",
    couleur: "#10B981",
    couche: "support",
    outils_mcp: [
      "search_nccn",
      "search_esmo",
      "search_has",
      "get_recommendation",
    ],
    standards: ["NCCN Guidelines", "ESMO Guidelines", "Recommandations HAS"],
    description:
      "Accède aux référentiels médicaux (NCCN, ESMO, HAS) pour fournir les recommandations thérapeutiques adaptées au profil du patient. Recherche contextuelle par pathologie, stade et ligne de traitement.",
  },
  {
    name: "Agent Historique",
    role: "Mémoire longitudinale",
    icone: "📋",
    couleur: "#6366F1",
    couche: "support",
    outils_mcp: [
      "get_patient_history",
      "get_prior_exams",
      "get_treatments",
      "get_biomarkers",
    ],
    standards: ["HL7 FHIR", "DICOM SR"],
    description:
      "Gère la mémoire longitudinale du patient. Stocke examens, traitements, résultats biologiques. Fournit le contexte temporel aux agents spécialistes pour le suivi évolutif.",
  },
  {
    name: "Agent Qualité",
    role: "Vérification et cohérence",
    icone: "🛡️",
    couleur: "#EF4444",
    couche: "support",
    outils_mcp: [
      "verify_consistency",
      "check_anti_hallucination",
      "compute_confidence",
      "audit_trail",
    ],
    standards: ["Anti-hallucination", "Audit Trail"],
    description:
      "Vérifie la cohérence entre les rapports des agents spécialistes. Détecte les contradictions et les hallucinations. Calcule les scores de confiance et maintient une trace d'audit complète.",
  },
  {
    name: "Hyper-Agent Tumor Board",
    role: "Orchestration et synthèse pré-RCP",
    icone: "🧠",
    couleur: "#EC4899",
    couche: "orchestrateur",
    outils_mcp: [
      "orchestrate_agents",
      "correlate_cross_organ",
      "compute_global_recist",
      "generate_synthesis",
      "prepare_rcp",
    ],
    standards: ["RECIST 1.1 Global", "Critères RCP"],
    description:
      "Orchestre les agents spécialistes, détecte les corrélations inter-organes, calcule l'évaluation RECIST globale, et prépare la synthèse pré-RCP avec points de discussion et recommandations.",
  },
];

// ─── Connexions MCP entre agents ────────────────────────

export const MCP_CONNECTIONS: MCPConnection[] = [
  { from: "Hyper-Agent Tumor Board", to: "Agent Thorax", protocol: "MCP", type: "orchestration" },
  { from: "Hyper-Agent Tumor Board", to: "Agent Hépatique", protocol: "MCP", type: "orchestration" },
  { from: "Hyper-Agent Tumor Board", to: "Agent Ganglionnaire", protocol: "MCP", type: "orchestration" },
  { from: "Hyper-Agent Tumor Board", to: "Agent Osseux", protocol: "MCP", type: "orchestration" },
  { from: "Hyper-Agent Tumor Board", to: "Agent RAG / Guidelines", protocol: "MCP", type: "query" },
  { from: "Hyper-Agent Tumor Board", to: "Agent Qualité", protocol: "MCP", type: "verification" },
  { from: "Agent Thorax", to: "Agent Historique", protocol: "MCP", type: "data" },
  { from: "Agent Hépatique", to: "Agent Historique", protocol: "MCP", type: "data" },
  { from: "Agent Ganglionnaire", to: "Agent Historique", protocol: "MCP", type: "data" },
  { from: "Agent Osseux", to: "Agent Historique", protocol: "MCP", type: "data" },
  { from: "Agent Qualité", to: "Agent Thorax", protocol: "MCP", type: "verification" },
  { from: "Agent Qualité", to: "Agent Hépatique", protocol: "MCP", type: "verification" },
];
