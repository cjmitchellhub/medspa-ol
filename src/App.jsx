import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const BODY_SYSTEMS = [
  {
    id: "cardiovascular", label: "Cardiovascular", emoji: "🫀",
    beginner: [
      { id:"cv1",  en:"heart",          es:"corazón",          phrase_en:"Do you have chest pain?",           phrase_es:"¿Tiene dolor en el pecho?" },
      { id:"cv2",  en:"artery",         es:"arteria",          phrase_en:"Your arteries are blocked.",         phrase_es:"Sus arterias están bloqueadas." },
      { id:"cv3",  en:"vein",           es:"vena",             phrase_en:"I need to draw blood from your vein.", phrase_es:"Necesito sacarle sangre de la vena." },
      { id:"cv4",  en:"blood pressure", es:"presión arterial", phrase_en:"Your blood pressure is high.",       phrase_es:"Su presión arterial está alta." },
      { id:"cv5",  en:"pulse",          es:"pulso",            phrase_en:"I am going to check your pulse.",    phrase_es:"Voy a tomarle el pulso." },
      { id:"cv6",  en:"palpitations",   es:"palpitaciones",    phrase_en:"Do you feel your heart racing?",    phrase_es:"¿Siente que el corazón le late muy rápido?" },
    ],
    intermediate: [
      { id:"cv7",  en:"heart failure",       es:"insuficiencia cardíaca",  phrase_en:"You have signs of heart failure.",        phrase_es:"Tiene signos de insuficiencia cardíaca." },
      { id:"cv8",  en:"coronary artery",     es:"arteria coronaria",       phrase_en:"One of your coronary arteries is narrowed.", phrase_es:"Una de sus arterias coronarias está estrechada." },
      { id:"cv9",  en:"irregular heartbeat", es:"latido irregular",        phrase_en:"Your heart has an irregular rhythm.",      phrase_es:"Su corazón tiene un ritmo irregular." },
      { id:"cv10", en:"ejection fraction",   es:"fracción de eyección",    phrase_en:"Your ejection fraction is reduced.",       phrase_es:"Su fracción de eyección está reducida." },
      { id:"cv11", en:"heart attack",        es:"infarto al miocardio",    phrase_en:"You had a heart attack.",                  phrase_es:"Tuvo un infarto al miocardio." },
      { id:"cv12", en:"aortic valve",        es:"válvula aórtica",         phrase_en:"Your aortic valve is leaking.",            phrase_es:"Su válvula aórtica tiene una fuga." },
    ],
    advanced: [
      { id:"cv13", en:"left ventricular hypertrophy", es:"hipertrofia ventricular izquierda", phrase_en:"The echo shows left ventricular hypertrophy.", phrase_es:"El ecocardiograma muestra hipertrofia ventricular izquierda." },
      { id:"cv14", en:"pericardial effusion",         es:"derrame pericárdico",               phrase_en:"There is fluid around your heart.",           phrase_es:"Hay líquido alrededor de su corazón." },
      { id:"cv15", en:"troponin",                     es:"troponina",                         phrase_en:"Your troponin level is elevated, indicating heart damage.", phrase_es:"Su nivel de troponina está elevado, lo que indica daño al corazón." },
      { id:"cv16", en:"cardiac catheterization",      es:"cateterismo cardíaco",              phrase_en:"We recommend a cardiac catheterization.",      phrase_es:"Recomendamos un cateterismo cardíaco." },
      { id:"cv17", en:"narrowing of a vessel",        es:"estenosis vascular",                phrase_en:"You have significant narrowing of that vessel.", phrase_es:"Tiene un estrechamiento significativo de ese vaso." },
      { id:"cv18", en:"electric shock to the heart",  es:"desfibrilación",                    phrase_en:"We had to shock your heart to restore its rhythm.", phrase_es:"Tuvimos que darle una descarga al corazón para restaurar su ritmo." },
    ],
  },
  {
    id: "respiratory", label: "Respiratory", emoji: "🫁",
    beginner: [
      { id:"rsp1", en:"lungs",               es:"pulmones",       phrase_en:"Take a deep breath.",               phrase_es:"Respire hondo." },
      { id:"rsp2", en:"bronchus",            es:"bronquio",       phrase_en:"Your bronchial tubes are inflamed.", phrase_es:"Sus bronquios están inflamados." },
      { id:"rsp3", en:"trachea",             es:"tráquea",        phrase_en:"Your windpipe seems clear.",         phrase_es:"Su tráquea parece despejada." },
      { id:"rsp4", en:"shortness of breath", es:"falta de aire",  phrase_en:"Do you feel short of breath?",      phrase_es:"¿Siente falta de aire?" },
      { id:"rsp5", en:"cough",               es:"tos",            phrase_en:"How long have you had a cough?",    phrase_es:"¿Desde cuándo tiene tos?" },
      { id:"rsp6", en:"diaphragm",           es:"diafragma",      phrase_en:"Breathe with your diaphragm.",      phrase_es:"Respire con el diafragma." },
    ],
    intermediate: [
      { id:"rsp7",  en:"pneumonia",          es:"neumonía",              phrase_en:"Your X-ray shows pneumonia.",          phrase_es:"Su radiografía muestra neumonía." },
      { id:"rsp8",  en:"fluid around lung",  es:"derrame pleural",       phrase_en:"You have fluid around your lung.",     phrase_es:"Tiene líquido alrededor del pulmón." },
      { id:"rsp9",  en:"asthma",             es:"asma",                  phrase_en:"Your asthma is not well controlled.",  phrase_es:"Su asma no está bien controlada." },
      { id:"rsp10", en:"oxygen level",       es:"saturación de oxígeno", phrase_en:"Your oxygen level is low.",            phrase_es:"Su nivel de oxígeno está bajo." },
      { id:"rsp11", en:"airway opener",      es:"broncodilatador",       phrase_en:"We will give you a bronchodilator.",   phrase_es:"Le daremos un broncodilatador." },
      { id:"rsp12", en:"blood clot in lung", es:"embolia pulmonar",      phrase_en:"We suspect a blood clot in your lungs.", phrase_es:"Sospechamos un coágulo de sangre en sus pulmones." },
    ],
    advanced: [
      { id:"rsp13", en:"COPD flare-up",            es:"exacerbación de EPOC",    phrase_en:"You are having a COPD flare-up.",           phrase_es:"Está teniendo una exacerbación de EPOC." },
      { id:"rsp14", en:"breathing tube placement",  es:"intubación",              phrase_en:"We need to place a breathing tube.",         phrase_es:"Necesitamos colocarle un tubo de respiración." },
      { id:"rsp15", en:"collapsed lung",            es:"neumotórax",              phrase_en:"You have a collapsed lung.",                 phrase_es:"Tiene un pulmón colapsado." },
      { id:"rsp16", en:"diffusing capacity",        es:"capacidad de difusión",   phrase_en:"Your diffusing capacity test was abnormal.", phrase_es:"Su prueba de capacidad de difusión fue anormal." },
      { id:"rsp17", en:"mask ventilation",          es:"ventilación no invasiva", phrase_en:"We will use a mask to help you breathe.",    phrase_es:"Usaremos una máscara para ayudarle a respirar." },
      { id:"rsp18", en:"airway wash and sample",    es:"lavado broncoalveolar",   phrase_en:"We need to wash and sample your airways.",   phrase_es:"Necesitamos lavar y tomar muestras de sus vías respiratorias." },
    ],
  },
  {
    id: "gastrointestinal", label: "Gastrointestinal", emoji: "🫃",
    beginner: [
      { id:"gi1", en:"stomach",   es:"estómago",  phrase_en:"Where is your stomach pain?",         phrase_es:"¿Dónde le duele el estómago?" },
      { id:"gi2", en:"liver",     es:"hígado",    phrase_en:"Your liver enzymes are elevated.",     phrase_es:"Sus enzimas hepáticas están elevadas." },
      { id:"gi3", en:"intestine", es:"intestino", phrase_en:"Your intestines sound normal.",         phrase_es:"Sus intestinos suenan normal." },
      { id:"gi4", en:"nausea",    es:"náuseas",   phrase_en:"Do you feel nauseous?",                phrase_es:"¿Tiene náuseas?" },
      { id:"gi5", en:"vomiting",  es:"vómitos",   phrase_en:"Have you been vomiting?",              phrase_es:"¿Ha estado vomitando?" },
      { id:"gi6", en:"appendix",  es:"apéndice",  phrase_en:"We may need to remove your appendix.", phrase_es:"Es posible que necesitemos extirpar su apéndice." },
    ],
    intermediate: [
      { id:"gi7",  en:"colon inflammation", es:"colitis",              phrase_en:"You have inflammation of the colon.",    phrase_es:"Tiene inflamación del colon." },
      { id:"gi8",  en:"liver scarring",     es:"cirrosis",             phrase_en:"Your liver has significant scarring.",   phrase_es:"Su hígado tiene cicatrización significativa." },
      { id:"gi9",  en:"gallbladder",        es:"vesícula biliar",       phrase_en:"Your gallbladder may need to come out.", phrase_es:"Es posible que necesiten extirpar su vesícula biliar." },
      { id:"gi10", en:"stomach ulcer",      es:"úlcera péptica",        phrase_en:"You have an ulcer in your stomach.",    phrase_es:"Tiene una úlcera en el estómago." },
      { id:"gi11", en:"bowel blockage",     es:"obstrucción intestinal",phrase_en:"Your bowel is blocked.",               phrase_es:"Su intestino está obstruido." },
      { id:"gi12", en:"blood in stool",     es:"sangrado rectal",       phrase_en:"Have you noticed blood in your stool?", phrase_es:"¿Ha notado sangre en sus heces?" },
    ],
    advanced: [
      { id:"gi13", en:"liver-brain dysfunction", es:"encefalopatía hepática", phrase_en:"The liver disease is affecting your brain.",    phrase_es:"La enfermedad hepática está afectando su cerebro." },
      { id:"gi14", en:"esophageal varices",       es:"várices esofágicas",     phrase_en:"You have swollen veins in your esophagus that could bleed.", phrase_es:"Tiene venas dilatadas en el esófago que podrían sangrar." },
      { id:"gi15", en:"pancreas inflammation",    es:"pancreatitis",           phrase_en:"Your pancreas is severely inflamed.",           phrase_es:"Su páncreas está gravemente inflamado." },
      { id:"gi16", en:"camera exam of stomach",   es:"endoscopía",             phrase_en:"We need to look inside with a camera.",         phrase_es:"Necesitamos examinar el interior con una cámara." },
      { id:"gi17", en:"abdominal fluid buildup",  es:"ascitis",                phrase_en:"There is fluid building up in your abdomen.",   phrase_es:"Se está acumulando líquido en su abdomen." },
      { id:"gi18", en:"colon camera exam",        es:"colonoscopía",           phrase_en:"You are due for a colonoscopy.",                phrase_es:"Le corresponde hacerse una colonoscopía." },
    ],
  },
  {
    id: "musculoskeletal", label: "Musculoskeletal", emoji: "🦴",
    beginner: [
      { id:"msk1", en:"bone",     es:"hueso",             phrase_en:"You may have a broken bone.",  phrase_es:"Es posible que tenga un hueso roto." },
      { id:"msk2", en:"muscle",   es:"músculo",           phrase_en:"Your muscles are very tense.", phrase_es:"Sus músculos están muy tensos." },
      { id:"msk3", en:"joint",    es:"articulación",      phrase_en:"Which joint hurts the most?",  phrase_es:"¿Qué articulación le duele más?" },
      { id:"msk4", en:"spine",    es:"columna vertebral", phrase_en:"You have a spinal problem.",   phrase_es:"Usted tiene un problema en la columna vertebral." },
      { id:"msk5", en:"tendon",   es:"tendón",            phrase_en:"Your tendon is inflamed.",     phrase_es:"Su tendón está inflamado." },
      { id:"msk6", en:"fracture", es:"fractura",          phrase_en:"The X-ray shows a fracture.",  phrase_es:"La radiografía muestra una fractura." },
    ],
    intermediate: [
      { id:"msk7",  en:"cartilage",      es:"cartílago",        phrase_en:"Your cartilage is wearing down.",      phrase_es:"Su cartílago se está desgastando." },
      { id:"msk8",  en:"ligament",       es:"ligamento",        phrase_en:"You have a torn ligament.",            phrase_es:"Tiene un ligamento desgarrado." },
      { id:"msk9",  en:"bone thinning",  es:"osteoporosis",     phrase_en:"Your bone density is low.",            phrase_es:"Su densidad ósea está baja." },
      { id:"msk10", en:"herniated disc", es:"disco herniado",   phrase_en:"You have a herniated disc in your spine.", phrase_es:"Tiene un disco herniado en la columna." },
      { id:"msk11", en:"rotator cuff",   es:"manguito rotador", phrase_en:"Your rotator cuff is torn.",           phrase_es:"Tiene una rotura del manguito rotador." },
      { id:"msk12", en:"bone density",   es:"densidad ósea",    phrase_en:"We need to check your bone density.",  phrase_es:"Necesitamos revisar su densidad ósea." },
    ],
    advanced: [
      { id:"msk13", en:"muscle compartment pressure",     es:"síndrome compartimental", phrase_en:"There is dangerous pressure building in the muscle compartment.", phrase_es:"Hay una presión peligrosa acumulándose en el compartimento muscular." },
      { id:"msk14", en:"bone death from poor blood supply",es:"necrosis avascular",      phrase_en:"The bone is dying due to lack of blood supply.", phrase_es:"El hueso está muriendo por falta de riego sanguíneo." },
      { id:"msk15", en:"slipped vertebra",                es:"espondilolistesis",        phrase_en:"One vertebra has slipped forward over another.", phrase_es:"Una vértebra se ha deslizado hacia adelante sobre otra." },
      { id:"msk16", en:"joint camera surgery",            es:"artroscopía",              phrase_en:"We may repair the joint with arthroscopy.",  phrase_es:"Podríamos reparar la articulación mediante artroscopía." },
      { id:"msk17", en:"bone infection",                  es:"osteomielitis",            phrase_en:"There is a bone infection.",                phrase_es:"Hay una infección en el hueso." },
      { id:"msk18", en:"overuse fracture",                es:"fractura por estrés",      phrase_en:"You have a stress fracture from repetitive use.", phrase_es:"Tiene una fractura por estrés debido al uso repetitivo." },
    ],
  },
  {
    id: "neurological", label: "Neurological", emoji: "🧠",
    beginner: [
      { id:"nr1", en:"brain",       es:"cerebro",        phrase_en:"We need to scan your brain.",          phrase_es:"Necesitamos hacerle una imagen del cerebro." },
      { id:"nr2", en:"nerve",       es:"nervio",         phrase_en:"Your nerves may be damaged.",          phrase_es:"Es posible que tenga nervios dañados." },
      { id:"nr3", en:"headache",    es:"dolor de cabeza",phrase_en:"How severe is your headache?",         phrase_es:"¿Qué tan fuerte es su dolor de cabeza?" },
      { id:"nr4", en:"dizziness",   es:"mareos",         phrase_en:"Are you feeling dizzy?",               phrase_es:"¿Siente mareos?" },
      { id:"nr5", en:"seizure",     es:"convulsión",     phrase_en:"Have you ever had a seizure?",         phrase_es:"¿Alguna vez ha tenido una convulsión?" },
      { id:"nr6", en:"spinal cord", es:"médula espinal", phrase_en:"Your spinal cord is being compressed.", phrase_es:"Su médula espinal está siendo comprimida." },
    ],
    intermediate: [
      { id:"nr7",  en:"stroke",             es:"derrame cerebral",            phrase_en:"You are having a stroke.",                  phrase_es:"Está teniendo un derrame cerebral." },
      { id:"nr8",  en:"brain infection",    es:"meningitis",                  phrase_en:"We suspect an infection around your brain.", phrase_es:"Sospechamos una infección alrededor de su cerebro." },
      { id:"nr9",  en:"nerve damage",       es:"neuropatía",                  phrase_en:"You have nerve damage in your feet.",        phrase_es:"Tiene daño en los nervios de los pies." },
      { id:"nr10", en:"spinal tap",         es:"punción lumbar",              phrase_en:"We need to do a spinal tap.",                phrase_es:"Necesitamos hacerle una punción lumbar." },
      { id:"nr11", en:"multiple sclerosis", es:"esclerosis múltiple",         phrase_en:"You may have multiple sclerosis.",           phrase_es:"Es posible que tenga esclerosis múltiple." },
      { id:"nr12", en:"mini-stroke",        es:"ataque isquémico transitorio",phrase_en:"You may have had a mini-stroke.",           phrase_es:"Es posible que haya tenido un mini derrame cerebral." },
    ],
    advanced: [
      { id:"nr13", en:"high brain pressure",     es:"presión intracraneal elevada", phrase_en:"Your intracranial pressure is dangerously elevated.", phrase_es:"Su presión intracraneal está peligrosamente elevada." },
      { id:"nr14", en:"prolonged seizure",        es:"estado epiléptico",            phrase_en:"Your seizure is not stopping on its own.",           phrase_es:"Su convulsión no se detiene por sí sola." },
      { id:"nr15", en:"Guillain-Barre syndrome",  es:"síndrome de Guillain-Barré",   phrase_en:"Your immune system is attacking your nerves.",       phrase_es:"Su sistema inmunológico está atacando sus nervios." },
      { id:"nr16", en:"brain swelling",           es:"edema cerebral",               phrase_en:"Your brain is swelling.",                           phrase_es:"Su cerebro está inflamado." },
      { id:"nr17", en:"altered brain function",   es:"encefalopatía",                phrase_en:"The brain function is altered due to the illness.",  phrase_es:"La función cerebral está alterada debido a la enfermedad." },
      { id:"nr18", en:"cognitive decline",        es:"deterioro neurocognitivo",     phrase_en:"We are seeing signs of cognitive decline.",         phrase_es:"Estamos viendo signos de deterioro cognitivo." },
    ],
  },
  {
    id: "renal", label: "Renal", emoji: "🫘",
    beginner: [
      { id:"rn1", en:"kidney",      es:"riñón",         phrase_en:"Your kidneys are not filtering well.", phrase_es:"Sus riñones no están filtrando bien." },
      { id:"rn2", en:"urine",       es:"orina",         phrase_en:"Is your urine a different color?",     phrase_es:"¿Su orina tiene un color diferente?" },
      { id:"rn3", en:"bladder",     es:"vejiga",        phrase_en:"Do you feel pressure in your bladder?",phrase_es:"¿Siente presión en la vejiga?" },
      { id:"rn4", en:"kidney stone",es:"cálculo renal", phrase_en:"You have a kidney stone.",             phrase_es:"Tiene un cálculo renal." },
      { id:"rn5", en:"dialysis",    es:"diálisis",      phrase_en:"You may need dialysis.",               phrase_es:"Es posible que necesite diálisis." },
      { id:"rn6", en:"swelling",    es:"hinchazón",     phrase_en:"Do you have swelling in your legs?",   phrase_es:"¿Tiene hinchazón en las piernas?" },
    ],
    intermediate: [
      { id:"rn7",  en:"creatinine",        es:"creatinina",               phrase_en:"Your creatinine level is high.",           phrase_es:"Su nivel de creatinina está alto." },
      { id:"rn8",  en:"bladder infection", es:"infección urinaria",        phrase_en:"You have a urinary tract infection.",      phrase_es:"Tiene una infección urinaria." },
      { id:"rn9",  en:"protein in urine",  es:"proteína en la orina",      phrase_en:"There is protein leaking into your urine.",phrase_es:"Hay proteína escapándose a su orina." },
      { id:"rn10", en:"salt balance",      es:"equilibrio de electrolitos", phrase_en:"Your electrolytes are out of balance.",    phrase_es:"Sus electrolitos están desequilibrados." },
      { id:"rn11", en:"kidney ultrasound", es:"ultrasonido renal",          phrase_en:"We will do an ultrasound of your kidneys.",phrase_es:"Le haremos un ultrasonido de los riñones." },
      { id:"rn12", en:"fluid restriction", es:"restricción de líquidos",    phrase_en:"You need to limit how much you drink.",    phrase_es:"Necesita limitar la cantidad que bebe." },
    ],
    advanced: [
      { id:"rn13", en:"kidney filter inflammation", es:"glomerulonefritis",         phrase_en:"Your kidney filters are inflamed.",               phrase_es:"Los filtros de su riñón están inflamados." },
      { id:"rn14", en:"kidney biopsy",              es:"biopsia renal",              phrase_en:"We need to take a small sample of kidney tissue.", phrase_es:"Necesitamos tomar una pequeña muestra del tejido renal." },
      { id:"rn15", en:"dangerously high potassium", es:"hiperpotasemia",             phrase_en:"Your potassium is dangerously high.",              phrase_es:"Su potasio está peligrosamente alto." },
      { id:"rn16", en:"massive protein loss",       es:"síndrome nefrótico",         phrase_en:"Your kidneys are leaking large amounts of protein.", phrase_es:"Sus riñones están perdiendo grandes cantidades de proteína." },
      { id:"rn17", en:"very low urine output",      es:"oliguria",                   phrase_en:"You are producing very little urine.",             phrase_es:"Está produciendo muy poca orina." },
      { id:"rn18", en:"long-term kidney support",   es:"terapia de reemplazo renal", phrase_en:"You may need long-term kidney replacement therapy.", phrase_es:"Es posible que necesite terapia de reemplazo renal a largo plazo." },
    ],
  },
  {
    id: "endocrine", label: "Endocrine", emoji: "⚗️",
    beginner: [
      { id:"en1", en:"diabetes",    es:"diabetes",            phrase_en:"Do you have diabetes?",            phrase_es:"¿Tiene diabetes?" },
      { id:"en2", en:"insulin",     es:"insulina",            phrase_en:"Do you take insulin?",             phrase_es:"¿Toma insulina?" },
      { id:"en3", en:"hormone",     es:"hormona",             phrase_en:"Your hormone levels are off.",     phrase_es:"Sus niveles hormonales están alterados." },
      { id:"en4", en:"blood sugar", es:"azúcar en la sangre", phrase_en:"Your blood sugar is too high.",    phrase_es:"Su azúcar en la sangre está demasiado alta." },
      { id:"en5", en:"thyroid",     es:"tiroides",            phrase_en:"Your thyroid levels are abnormal.", phrase_es:"Sus niveles de tiroides están anormales." },
      { id:"en6", en:"pancreas",    es:"páncreas",            phrase_en:"Your pancreas is inflamed.",       phrase_es:"Su páncreas está inflamado." },
    ],
    intermediate: [
      { id:"en7",  en:"underactive thyroid",    es:"hipotiroidismo",            phrase_en:"Your thyroid is underactive.",                   phrase_es:"Su tiroides está poco activa." },
      { id:"en8",  en:"low blood sugar",        es:"hipoglucemia",              phrase_en:"Your blood sugar is dangerously low.",           phrase_es:"Su azúcar en sangre está peligrosamente baja." },
      { id:"en9",  en:"adrenal gland",          es:"glándula suprarrenal",      phrase_en:"Your adrenal gland is overactive.",             phrase_es:"Su glándula suprarrenal está hiperactiva." },
      { id:"en10", en:"unexplained weight gain",es:"aumento de peso sin causa", phrase_en:"Have you had unexplained weight gain?",         phrase_es:"¿Ha tenido aumento de peso sin explicación?" },
      { id:"en11", en:"3-month sugar average",  es:"hemoglobina A1c",           phrase_en:"Your A1c tells us your 3-month sugar average.", phrase_es:"Su A1c nos indica su promedio de azúcar de 3 meses." },
      { id:"en12", en:"overactive thyroid",     es:"enfermedad de Graves",      phrase_en:"You have an overactive thyroid called Graves disease.", phrase_es:"Tiene una tiroides hiperactiva llamada enfermedad de Graves." },
    ],
    advanced: [
      { id:"en13", en:"diabetic acid crisis",          es:"cetoacidosis diabética", phrase_en:"You are in diabetic ketoacidosis, a dangerous state.", phrase_es:"Está en cetoacidosis diabética, un estado peligroso." },
      { id:"en14", en:"too much cortisol",             es:"síndrome de Cushing",    phrase_en:"Your body is making too much cortisol.",              phrase_es:"Su cuerpo está produciendo demasiado cortisol." },
      { id:"en15", en:"adrenal insufficiency",         es:"enfermedad de Addison",  phrase_en:"Your adrenal glands are not making enough cortisol.", phrase_es:"Sus glándulas suprarrenales no producen suficiente cortisol." },
      { id:"en16", en:"adrenal tumor",                 es:"feocromocitoma",         phrase_en:"We suspect a tumor on your adrenal gland.",           phrase_es:"Sospechamos un tumor en la glándula suprarrenal." },
      { id:"en17", en:"water retention and low sodium",es:"SIADH",                  phrase_en:"Your body is retaining too much water, diluting your sodium.", phrase_es:"Su cuerpo está reteniendo demasiada agua, diluyendo su sodio." },
      { id:"en18", en:"thyroid crisis",                es:"tormenta tiroidea",      phrase_en:"You are having a life-threatening thyroid crisis.",    phrase_es:"Está teniendo una crisis tiroidea que pone en peligro su vida." },
    ],
  },
  {
    id: "oncology", label: "Oncology", emoji: "🎗️",
    beginner: [
      { id:"onc1", en:"cancer",       es:"cáncer",           phrase_en:"We found something that needs evaluation.", phrase_es:"Encontramos algo que requiere evaluación." },
      { id:"onc2", en:"tumor",        es:"tumor",            phrase_en:"There is a mass that needs evaluation.",    phrase_es:"Hay una masa que necesita evaluación." },
      { id:"onc3", en:"chemotherapy", es:"quimioterapia",    phrase_en:"You will need chemotherapy.",              phrase_es:"Va a necesitar quimioterapia." },
      { id:"onc4", en:"biopsy",       es:"biopsia",          phrase_en:"We need to do a biopsy.",                  phrase_es:"Necesitamos hacerle una biopsia." },
      { id:"onc5", en:"lymph node",   es:"ganglio linfático",phrase_en:"Your lymph nodes are enlarged.",           phrase_es:"Sus ganglios linfáticos están agrandados." },
      { id:"onc6", en:"remission",    es:"remisión",         phrase_en:"You are in remission.",                    phrase_es:"Está en remisión." },
    ],
    intermediate: [
      { id:"onc7",  en:"radiation therapy",    es:"radioterapia",        phrase_en:"We recommend radiation therapy.",            phrase_es:"Recomendamos radioterapia." },
      { id:"onc8",  en:"cancer spreading",     es:"metástasis",          phrase_en:"The cancer has spread to other organs.",     phrase_es:"El cáncer se ha extendido a otros órganos." },
      { id:"onc9",  en:"cancer staging",       es:"estadificación",      phrase_en:"We need to determine the stage of your cancer.", phrase_es:"Necesitamos determinar la etapa de su cáncer." },
      { id:"onc10", en:"tumor marker",         es:"marcador tumoral",    phrase_en:"Your tumor marker levels are elevated.",    phrase_es:"Sus niveles de marcadores tumorales están elevados." },
      { id:"onc11", en:"comfort-focused care", es:"cuidados paliativos", phrase_en:"Palliative care focuses on your comfort.", phrase_es:"Los cuidados paliativos se enfocan en su comodidad." },
      { id:"onc12", en:"immune-based treatment",es:"inmunoterapia",      phrase_en:"We may use immunotherapy to treat this.",   phrase_es:"Es posible que usemos inmunoterapia para tratar esto." },
    ],
    advanced: [
      { id:"onc13", en:"distant cancer effects",  es:"síndrome paraneoplásico",  phrase_en:"The cancer is causing symptoms in distant organs.", phrase_es:"El cáncer está causando síntomas en órganos distantes." },
      { id:"onc14", en:"treatment toxin release", es:"síndrome de lisis tumoral", phrase_en:"Treating the cancer can release toxic substances.", phrase_es:"El tratamiento del cáncer puede liberar sustancias tóxicas." },
      { id:"onc15", en:"fever with low immunity", es:"fiebre neutropénica",       phrase_en:"Your immune cells are very low and you have a fever, this is an emergency.", phrase_es:"Sus células inmunitarias están muy bajas y tiene fiebre, esto es una emergencia." },
      { id:"onc16", en:"precision medicine",      es:"terapia dirigida",          phrase_en:"This medication targets a specific mutation in your cancer.", phrase_es:"Este medicamento ataca una mutación específica en su cáncer." },
      { id:"onc17", en:"cancer-related fluid",    es:"derrame maligno",           phrase_en:"Cancer cells are causing fluid to build up.",           phrase_es:"Las células cancerosas están causando acumulación de líquido." },
      { id:"onc18", en:"stem cell transplant",    es:"trasplante de médula ósea", phrase_en:"You may need a bone marrow transplant.",              phrase_es:"Es posible que necesite un trasplante de médula ósea." },
    ],
  },
  {
    id: "rheumatology", label: "Rheumatology", emoji: "🦾",
    beginner: [
      { id:"rh1", en:"arthritis",         es:"artritis",        phrase_en:"You have rheumatoid arthritis.",         phrase_es:"Tiene artritis reumatoide." },
      { id:"rh2", en:"lupus",             es:"lupus",           phrase_en:"Your tests suggest lupus.",              phrase_es:"Sus pruebas sugieren lupus." },
      { id:"rh3", en:"inflammation",      es:"inflamación",     phrase_en:"There is significant inflammation.",     phrase_es:"Hay inflamación significativa." },
      { id:"rh4", en:"morning stiffness", es:"rigidez matutina",phrase_en:"Do you have morning stiffness?",         phrase_es:"¿Tiene rigidez por las mañanas?" },
      { id:"rh5", en:"gout",              es:"gota",            phrase_en:"Your uric acid is elevated.",           phrase_es:"Su ácido úrico está elevado." },
      { id:"rh6", en:"fatigue",           es:"fatiga",          phrase_en:"Are you experiencing extreme fatigue?", phrase_es:"¿Está experimentando fatiga extrema?" },
    ],
    intermediate: [
      { id:"rh7",  en:"immune attack on self",     es:"condición autoinmune",              phrase_en:"This is an autoimmune condition.",         phrase_es:"Esta es una condición autoinmune." },
      { id:"rh8",  en:"swollen joints",            es:"articulaciones inflamadas",          phrase_en:"Which joints are swollen?",               phrase_es:"¿Qué articulaciones están inflamadas?" },
      { id:"rh9",  en:"disease-slowing drug",      es:"fármaco modificador de enfermedad", phrase_en:"We will start a medication to slow the disease.", phrase_es:"Iniciaremos un medicamento para frenar la enfermedad." },
      { id:"rh10", en:"joint erosion",             es:"erosión articular",                 phrase_en:"The X-ray shows joint erosion.",           phrase_es:"La radiografía muestra erosión articular." },
      { id:"rh11", en:"joint lining swelling",     es:"sinovitis",                         phrase_en:"The lining of the joint is inflamed.",     phrase_es:"El revestimiento de la articulación está inflamado." },
      { id:"rh12", en:"blood vessel inflammation", es:"vasculitis",                        phrase_en:"Your blood vessels are inflamed.",         phrase_es:"Sus vasos sanguíneos están inflamados." },
    ],
    advanced: [
      { id:"rh13", en:"positive ANA test",          es:"anticuerpo antinuclear positivo", phrase_en:"Your ANA test is positive, suggesting autoimmune disease.", phrase_es:"Su prueba ANA es positiva, lo que sugiere enfermedad autoinmune." },
      { id:"rh14", en:"dry gland syndrome",         es:"síndrome de Sjögren",             phrase_en:"Your immune system is attacking your moisture-producing glands.", phrase_es:"Su sistema inmunológico está atacando sus glándulas productoras de humedad." },
      { id:"rh15", en:"skin and tissue hardening",  es:"esclerodermia",                   phrase_en:"Your skin and connective tissue are hardening.", phrase_es:"Su piel y tejido conectivo se están endureciendo." },
      { id:"rh16", en:"complement levels",          es:"niveles de complemento",          phrase_en:"Your complement levels are low, suggesting active lupus.", phrase_es:"Sus niveles de complemento están bajos, lo que sugiere lupus activo." },
      { id:"rh17", en:"muscle inflammation",        es:"miositis",                        phrase_en:"Your muscle tissue is inflamed.",               phrase_es:"Su tejido muscular está inflamado." },
      { id:"rh18", en:"biologic drug",              es:"medicamento biológico",           phrase_en:"We will start a biologic medication targeting your immune system.", phrase_es:"Iniciaremos un medicamento biológico que actúa sobre su sistema inmunológico." },
    ],
  },
  {
    id: "dermatology", label: "Dermatology", emoji: "🧴",
    beginner: [
      { id:"derm1", en:"skin",    es:"piel",       phrase_en:"I need to examine your skin.",  phrase_es:"Necesito examinar su piel." },
      { id:"derm2", en:"rash",    es:"sarpullido", phrase_en:"When did the rash appear?",     phrase_es:"¿Cuándo apareció el sarpullido?" },
      { id:"derm3", en:"itching", es:"picazón",    phrase_en:"Is the itching constant?",      phrase_es:"¿La picazón es constante?" },
      { id:"derm4", en:"wound",   es:"herida",     phrase_en:"How did you get this wound?",   phrase_es:"¿Cómo se hizo esta herida?" },
      { id:"derm5", en:"blister", es:"ampolla",    phrase_en:"Do not pop the blisters.",      phrase_es:"No reviente las ampollas." },
      { id:"derm6", en:"mole",    es:"lunar",      phrase_en:"This mole has changed shape.",  phrase_es:"Este lunar ha cambiado de forma." },
    ],
    intermediate: [
      { id:"derm7",  en:"eczema",                  es:"eczema",               phrase_en:"You have eczema, avoid triggers.",    phrase_es:"Tiene eczema, evite los desencadenantes." },
      { id:"derm8",  en:"skin infection",          es:"infección de la piel", phrase_en:"The skin is infected.",               phrase_es:"La piel está infectada." },
      { id:"derm9",  en:"psoriasis",               es:"psoriasis",            phrase_en:"The scaling is consistent with psoriasis.", phrase_es:"Las escamas son compatibles con psoriasis." },
      { id:"derm10", en:"spreading skin infection",es:"celulitis",            phrase_en:"You have a spreading skin infection called cellulitis.", phrase_es:"Tiene una infección cutánea que se extiende, llamada celulitis." },
      { id:"derm11", en:"hives",                   es:"urticaria",            phrase_en:"These are hives, likely from an allergic reaction.", phrase_es:"Esto es urticaria, probablemente por una reacción alérgica." },
      { id:"derm12", en:"skin sample",             es:"biopsia de piel",      phrase_en:"We need to take a small sample of skin.", phrase_es:"Necesitamos tomar una pequeña muestra de piel." },
    ],
    advanced: [
      { id:"derm13", en:"severe drug rash",          es:"síndrome de Stevens-Johnson",phrase_en:"This is a severe drug reaction affecting the skin.", phrase_es:"Esta es una reacción grave a un medicamento que afecta la piel." },
      { id:"derm14", en:"skin cancer",               es:"melanoma",                   phrase_en:"We are concerned this may be a melanoma.",          phrase_es:"Nos preocupa que esto pueda ser un melanoma." },
      { id:"derm15", en:"layer-by-layer excision",   es:"cirugía de Mohs",            phrase_en:"Mohs surgery removes skin cancer layer by layer.",  phrase_es:"La cirugía de Mohs elimina el cáncer de piel capa por capa." },
      { id:"derm16", en:"skin shearing sign",        es:"signo de Nikolsky",          phrase_en:"The skin is shearing off with gentle pressure.",    phrase_es:"La piel se desprende con presión suave." },
      { id:"derm17", en:"blistering autoimmune rash",es:"pénfigo vulgar",             phrase_en:"Your immune system is attacking the skin's binding proteins.", phrase_es:"Su sistema inmunológico está atacando las proteínas de unión de la piel." },
      { id:"derm18", en:"sun sensitivity",           es:"fotosensibilidad",           phrase_en:"Your skin is very sensitive to sunlight due to the medication.", phrase_es:"Su piel es muy sensible a la luz solar debido al medicamento." },
    ],
  },
  {
    id: "ophthalmology", label: "Ophthalmology", emoji: "👁️",
    beginner: [
      { id:"oph1", en:"eye",           es:"ojo",             phrase_en:"I need to examine your eyes.",      phrase_es:"Necesito examinar sus ojos." },
      { id:"oph2", en:"vision",        es:"visión",          phrase_en:"Has your vision changed recently?", phrase_es:"¿Ha cambiado su visión recientemente?" },
      { id:"oph3", en:"eye pain",      es:"dolor de ojos",   phrase_en:"Are you having eye pain?",          phrase_es:"¿Tiene dolor en los ojos?" },
      { id:"oph4", en:"blurry vision", es:"visión borrosa",  phrase_en:"Is your vision blurry?",            phrase_es:"¿Tiene la visión borrosa?" },
      { id:"oph5", en:"light",         es:"luz",             phrase_en:"Does light bother your eyes?",      phrase_es:"¿Le molesta la luz en los ojos?" },
      { id:"oph6", en:"redness",       es:"enrojecimiento",  phrase_en:"When did the redness start?",       phrase_es:"¿Cuándo comenzó el enrojecimiento?" },
    ],
    intermediate: [
      { id:"oph7",  en:"glaucoma",      es:"glaucoma",         phrase_en:"You have increased pressure in your eye.", phrase_es:"Tiene presión elevada dentro del ojo." },
      { id:"oph8",  en:"cornea",        es:"córnea",           phrase_en:"Your cornea has a small scratch.",         phrase_es:"Su córnea tiene una pequeña raspadura." },
      { id:"oph9",  en:"retina",        es:"retina",           phrase_en:"Your retina needs to be examined.",        phrase_es:"Su retina necesita ser examinada." },
      { id:"oph10", en:"lens",          es:"cristalino",       phrase_en:"The lens of your eye has become cloudy.",  phrase_es:"El cristalino de su ojo se ha opacado." },
      { id:"oph11", en:"eye pressure",  es:"presión ocular",   phrase_en:"We are going to measure your eye pressure.",phrase_es:"Vamos a medir la presión de su ojo." },
      { id:"oph12", en:"double vision", es:"visión doble",     phrase_en:"Are you seeing double?",                  phrase_es:"¿Está viendo doble?" },
    ],
    advanced: [
      { id:"oph13", en:"cloudy lens",          es:"cataratas",                 phrase_en:"You have cataracts that are affecting your vision.",    phrase_es:"Tiene cataratas que están afectando su visión." },
      { id:"oph14", en:"retinal detachment",   es:"desprendimiento de retina", phrase_en:"Your retina is detaching, this is an emergency.",      phrase_es:"Su retina se está desprendiendo, esto es una emergencia." },
      { id:"oph15", en:"macular degeneration", es:"degeneración macular",      phrase_en:"The central part of your retina is deteriorating.",    phrase_es:"La parte central de su retina se está deteriorando." },
      { id:"oph16", en:"diabetic eye disease", es:"retinopatía diabética",     phrase_en:"Your diabetes has damaged the blood vessels in your eye.", phrase_es:"Su diabetes ha dañado los vasos sanguíneos de su ojo." },
      { id:"oph17", en:"optic nerve damage",   es:"neuropatía óptica",         phrase_en:"Your optic nerve is damaged.",                         phrase_es:"Su nervio óptico está dañado." },
      { id:"oph18", en:"eye injection",        es:"inyección intravítrea",     phrase_en:"You will need a medication injection inside the eye.",  phrase_es:"Necesitará una inyección de medicamento dentro del ojo." },
    ],
  },
  {
    id: "obstetrics", label: "Obstetrics", emoji: "🤰",
    beginner: [
      { id:"ob1", en:"pregnancy",      es:"embarazo",           phrase_en:"Are you pregnant?",                    phrase_es:"¿Está embarazada?" },
      { id:"ob2", en:"due date",       es:"fecha de parto",     phrase_en:"What is your due date?",               phrase_es:"¿Cuál es su fecha de parto?" },
      { id:"ob3", en:"contractions",   es:"contracciones",      phrase_en:"How far apart are your contractions?", phrase_es:"¿Con qué frecuencia tiene las contracciones?" },
      { id:"ob4", en:"baby",           es:"bebé",               phrase_en:"The baby looks healthy.",              phrase_es:"El bebé parece estar bien." },
      { id:"ob5", en:"water breaking", es:"ruptura de membranas",phrase_en:"Has your water broken?",             phrase_es:"¿Se le ha roto la fuente?" },
      { id:"ob6", en:"weeks pregnant", es:"semanas de embarazo", phrase_en:"How many weeks pregnant are you?",   phrase_es:"¿Cuántas semanas de embarazo tiene?" },
    ],
    intermediate: [
      { id:"ob7",  en:"prenatal visit",                       es:"visita prenatal",     phrase_en:"You are here for your prenatal visit.",       phrase_es:"Está aquí para su visita prenatal." },
      { id:"ob8",  en:"fetal heartbeat",                      es:"latido fetal",        phrase_en:"I am going to listen to the fetal heartbeat.",phrase_es:"Voy a escuchar el latido del corazón del bebé." },
      { id:"ob9",  en:"high blood pressure in pregnancy",     es:"preeclampsia",        phrase_en:"You have high blood pressure related to your pregnancy.", phrase_es:"Tiene presión arterial alta relacionada con el embarazo." },
      { id:"ob10", en:"cesarean section",                     es:"cesárea",             phrase_en:"You may need a cesarean section.",            phrase_es:"Es posible que necesite una cesárea." },
      { id:"ob11", en:"ultrasound",                           es:"ultrasonido",         phrase_en:"We will do an ultrasound to check the baby.", phrase_es:"Le haremos un ultrasonido para revisar al bebé." },
      { id:"ob12", en:"amniotic fluid",                       es:"líquido amniótico",   phrase_en:"The amniotic fluid level looks normal.",      phrase_es:"El nivel de líquido amniótico parece normal." },
    ],
    advanced: [
      { id:"ob13", en:"placenta previa",          es:"placenta previa",             phrase_en:"Your placenta is covering the cervix.",            phrase_es:"Su placenta está cubriendo el cuello uterino." },
      { id:"ob14", en:"placental abruption",      es:"desprendimiento de placenta", phrase_en:"The placenta is separating from the uterine wall.", phrase_es:"La placenta se está separando de la pared uterina." },
      { id:"ob15", en:"pregnancy-related seizure",es:"eclampsia",                   phrase_en:"You had a seizure related to your blood pressure.", phrase_es:"Tuvo una convulsión relacionada con su presión arterial." },
      { id:"ob16", en:"fetal position",           es:"presentación fetal",          phrase_en:"The baby is in breech position.",                  phrase_es:"El bebé está en posición de nalgas." },
      { id:"ob17", en:"gestational diabetes",     es:"diabetes gestacional",        phrase_en:"You have developed diabetes during pregnancy.",    phrase_es:"Ha desarrollado diabetes durante el embarazo." },
      { id:"ob18", en:"HELLP syndrome",           es:"síndrome HELLP",              phrase_en:"You have a serious pregnancy complication affecting your blood and liver.", phrase_es:"Tiene una complicación grave del embarazo que afecta la sangre y el hígado." },
    ],
  },
  {
    id: "gynecology", label: "Gynecology", emoji: "🌸",
    beginner: [
      { id:"gyn1", en:"period",           es:"menstruación",     phrase_en:"When was your last period?",           phrase_es:"¿Cuándo fue su última menstruación?" },
      { id:"gyn2", en:"uterus",           es:"útero",            phrase_en:"Your uterus feels normal in size.",    phrase_es:"Su útero parece tener un tamaño normal." },
      { id:"gyn3", en:"ovary",            es:"ovario",           phrase_en:"There is a cyst on your ovary.",       phrase_es:"Hay un quiste en su ovario." },
      { id:"gyn4", en:"vaginal discharge",es:"secreción vaginal",phrase_en:"Have you noticed any unusual discharge?", phrase_es:"¿Ha notado alguna secreción inusual?" },
      { id:"gyn5", en:"pelvic pain",      es:"dolor pélvico",    phrase_en:"Where exactly is the pelvic pain?",   phrase_es:"¿Dónde exactamente es el dolor pélvico?" },
      { id:"gyn6", en:"cervix",           es:"cuello uterino",   phrase_en:"I need to examine your cervix.",      phrase_es:"Necesito examinar su cuello uterino." },
    ],
    intermediate: [
      { id:"gyn7",  en:"pelvic exam",       es:"examen pélvico",         phrase_en:"I am going to perform a pelvic exam.",      phrase_es:"Voy a realizarle un examen pélvico." },
      { id:"gyn8",  en:"Pap smear",         es:"Papanicolaou",           phrase_en:"You are due for a Pap smear.",              phrase_es:"Le corresponde hacerse un Papanicolaou." },
      { id:"gyn9",  en:"ovarian cyst",      es:"quiste ovárico",         phrase_en:"You have a cyst on your ovary.",            phrase_es:"Tiene un quiste en su ovario." },
      { id:"gyn10", en:"irregular periods", es:"menstruación irregular", phrase_en:"Your periods have been irregular.",         phrase_es:"Sus menstruaciones han sido irregulares." },
      { id:"gyn11", en:"fibroid",           es:"fibroma uterino",        phrase_en:"You have a fibroid in your uterus.",        phrase_es:"Tiene un fibroma en el útero." },
      { id:"gyn12", en:"STI screening",     es:"prueba de ETS",          phrase_en:"We are going to test for sexually transmitted infections.", phrase_es:"Vamos a hacerle pruebas de infecciones de transmisión sexual." },
    ],
    advanced: [
      { id:"gyn13", en:"endometriosis",             es:"endometriosis",                  phrase_en:"You have tissue growing outside the uterus.",      phrase_es:"Tiene tejido creciendo fuera del útero." },
      { id:"gyn14", en:"cervical cancer screening", es:"colposcopía",                    phrase_en:"We need a closer look at your cervix.",             phrase_es:"Necesitamos observar su cuello uterino más de cerca." },
      { id:"gyn15", en:"uterine lining overgrowth", es:"hiperplasia endometrial",        phrase_en:"The lining of your uterus is thicker than normal.", phrase_es:"El revestimiento de su útero está más grueso de lo normal." },
      { id:"gyn16", en:"ectopic pregnancy",         es:"embarazo ectópico",              phrase_en:"The pregnancy is outside the uterus, which is an emergency.", phrase_es:"El embarazo está fuera del útero, lo cual es una emergencia." },
      { id:"gyn17", en:"PCOS",                      es:"síndrome de ovario poliquístico",phrase_en:"You have a hormonal condition called PCOS.",        phrase_es:"Tiene una condición hormonal llamada síndrome de ovario poliquístico." },
      { id:"gyn18", en:"uterine prolapse",          es:"prolapso uterino",               phrase_en:"Your uterus has shifted downward out of position.", phrase_es:"Su útero se ha desplazado hacia abajo fuera de su posición." },
    ],
  },
];

const CLINICAL_SCENARIOS = [
  {
    id: "history", label: "Taking History", emoji: "📋",
    beginner: [
      { id:"hs1", en:"What brings you in today?",               es:"¿Qué le trae por aquí hoy?",                     phrase_en:"Opener",            phrase_es:"Apertura" },
      { id:"hs2", en:"How long have you had this?",             es:"¿Hace cuánto tiempo tiene esto?",                phrase_en:"Duration",          phrase_es:"Duración" },
      { id:"hs3", en:"Does anything make it better or worse?",  es:"¿Hay algo que lo mejore o empeore?",             phrase_en:"Modifying factors", phrase_es:"Factores modificadores" },
      { id:"hs4", en:"On a scale of 1 to 10, how is your pain?",es:"En una escala del 1 al 10, ¿cómo está su dolor?",phrase_en:"Pain scale",        phrase_es:"Escala de dolor" },
      { id:"hs5", en:"Do you have any allergies?",              es:"¿Tiene alguna alergia?",                         phrase_en:"Allergies",         phrase_es:"Alergias" },
      { id:"hs6", en:"What medications do you take?",           es:"¿Qué medicamentos toma?",                        phrase_en:"Medications",       phrase_es:"Medicamentos" },
    ],
    intermediate: [
      { id:"hs7",  en:"Have you had surgery before?",           es:"¿Ha tenido cirugías anteriores?",                phrase_en:"Surgical history",   phrase_es:"Historial quirúrgico" },
      { id:"hs8",  en:"Does anyone in your family have this?",  es:"¿Alguien en su familia tiene esto?",             phrase_en:"Family history",     phrase_es:"Historial familiar" },
      { id:"hs9",  en:"Do you smoke or drink alcohol?",         es:"¿Fuma o bebe alcohol?",                          phrase_en:"Social history",     phrase_es:"Historial social" },
      { id:"hs10", en:"Have you traveled recently?",            es:"¿Ha viajado recientemente?",                     phrase_en:"Travel history",     phrase_es:"Historial de viajes" },
      { id:"hs11", en:"Are you sexually active?",               es:"¿Tiene actividad sexual?",                       phrase_en:"Sexual history",     phrase_es:"Historial sexual" },
      { id:"hs12", en:"Did the pain wake you from sleep?",      es:"¿El dolor le despertó del sueño?",               phrase_en:"Nocturnal symptoms", phrase_es:"Síntomas nocturnos" },
    ],
    advanced: [
      { id:"hs13", en:"Do you have a healthcare proxy?",                           es:"¿Tiene un representante de salud?",                          phrase_en:"Advance directives",      phrase_es:"Directivas anticipadas" },
      { id:"hs14", en:"Can you describe the quality of the pain, sharp, dull, burning, or cramping?", es:"¿Puede describir el carácter del dolor, agudo, sordo, ardiente o tipo cólico?", phrase_en:"Pain characterization", phrase_es:"Caracterización del dolor" },
      { id:"hs15", en:"Have you noticed any involuntary weight loss?",             es:"¿Ha notado pérdida de peso involuntaria?",                   phrase_en:"Constitutional symptoms", phrase_es:"Síntomas constitucionales" },
      { id:"hs16", en:"What was your baseline function before this illness?",      es:"¿Cuál era su estado funcional antes de esta enfermedad?",    phrase_en:"Functional baseline",     phrase_es:"Estado funcional basal" },
      { id:"hs17", en:"Are there barriers to taking your medications consistently?",es:"¿Hay obstáculos para tomar sus medicamentos de manera constante?", phrase_en:"Medication adherence", phrase_es:"Adherencia al tratamiento" },
      { id:"hs18", en:"Do you have an advance directive or living will?",           es:"¿Tiene una directiva anticipada o testamento vital?",         phrase_en:"End-of-life planning",    phrase_es:"Planificación al final de la vida" },
    ],
  },
  {
    id: "physical_exam", label: "Physical Exam", emoji: "🩺",
    beginner: [
      { id:"pe1", en:"I am going to examine you now.",    es:"Voy a examinarle ahora.",             phrase_en:"Exam intro",   phrase_es:"Introducción" },
      { id:"pe2", en:"Does it hurt when I press here?",  es:"¿Le duele cuando aprieto aquí?",      phrase_en:"Palpation",    phrase_es:"Palpación" },
      { id:"pe3", en:"Please open your mouth.",          es:"Por favor abra la boca.",             phrase_en:"Oral exam",    phrase_es:"Examen oral" },
      { id:"pe4", en:"I need to listen to your heart.",  es:"Necesito escuchar su corazón.",       phrase_en:"Auscultation", phrase_es:"Auscultación" },
      { id:"pe5", en:"Can you squeeze my fingers?",      es:"¿Puede apretar mis dedos?",           phrase_en:"Grip strength",phrase_es:"Fuerza de agarre" },
      { id:"pe6", en:"Follow my finger with your eyes.", es:"Siga mi dedo con los ojos.",          phrase_en:"Eye tracking", phrase_es:"Seguimiento ocular" },
    ],
    intermediate: [
      { id:"pe7",  en:"I am going to press on your abdomen.",          es:"Voy a presionar su abdomen.",            phrase_en:"Abdominal exam",    phrase_es:"Examen abdominal" },
      { id:"pe8",  en:"Tell me if the pain gets worse when I release.",es:"Dígame si el dolor empeora cuando suelto.",phrase_en:"Rebound tenderness",phrase_es:"Rebote" },
      { id:"pe9",  en:"Please take a deep breath and hold it.",        es:"Por favor respire profundo y aguante.",  phrase_en:"Respiratory exam",  phrase_es:"Examen respiratorio" },
      { id:"pe10", en:"I am going to check your reflexes.",            es:"Voy a revisar sus reflejos.",           phrase_en:"Neurological exam",  phrase_es:"Examen neurológico" },
      { id:"pe11", en:"Can you walk in a straight line?",              es:"¿Puede caminar en línea recta?",        phrase_en:"Gait assessment",   phrase_es:"Evaluación de la marcha" },
      { id:"pe12", en:"I need to examine your lymph nodes.",           es:"Necesito examinar sus ganglios linfáticos.",phrase_en:"Lymph node exam",phrase_es:"Examen de ganglios" },
    ],
    advanced: [
      { id:"pe13", en:"I am going to check for fluid in your abdomen.",es:"Voy a evaluar si hay líquido en su abdomen.",    phrase_en:"Shifting dullness", phrase_es:"Matidez cambiante" },
      { id:"pe14", en:"Does the pain spread anywhere?",                es:"¿El dolor se irradia a algún lugar?",             phrase_en:"Radiation of pain", phrase_es:"Irradiación del dolor" },
      { id:"pe15", en:"I am checking your foot reflex.",               es:"Estoy comprobando el reflejo de Babinski.",       phrase_en:"Babinski reflex",   phrase_es:"Reflejo de Babinski" },
      { id:"pe16", en:"Your neck vein pressure appears elevated.",     es:"Su presión venosa yugular parece elevada.",       phrase_en:"JVP assessment",    phrase_es:"Evaluación de la PVY" },
      { id:"pe17", en:"I am going to perform a rectal exam.",          es:"Voy a realizarle un tacto rectal.",               phrase_en:"Rectal exam",       phrase_es:"Tacto rectal" },
      { id:"pe18", en:"Your peripheral pulses are diminished.",        es:"Sus pulsos periféricos están disminuidos.",       phrase_en:"Vascular exam",     phrase_es:"Examen vascular" },
    ],
  },
  {
    id: "diagnosis", label: "Diagnosis & Plan", emoji: "📊",
    beginner: [
      { id:"dx1", en:"We need to run some tests.",            es:"Necesitamos hacerle algunas pruebas.",    phrase_en:"Ordering tests",phrase_es:"Ordenar pruebas" },
      { id:"dx2", en:"Your results came back.",               es:"Los resultados llegaron.",                phrase_en:"Results",       phrase_es:"Resultados" },
      { id:"dx3", en:"You will need to be admitted.",         es:"Necesita ser hospitalizado/a.",           phrase_en:"Admission",     phrase_es:"Admisión" },
      { id:"dx4", en:"I am going to prescribe a medication.", es:"Le voy a recetar un medicamento.",        phrase_en:"Prescribing",   phrase_es:"Prescripción" },
      { id:"dx5", en:"Take this twice a day with food.",      es:"Tome esto dos veces al día con comida.", phrase_en:"Instructions",  phrase_es:"Instrucciones" },
      { id:"dx6", en:"Do you have any questions?",            es:"¿Tiene alguna pregunta?",                phrase_en:"Closing",       phrase_es:"Cierre" },
    ],
    intermediate: [
      { id:"dx7",  en:"The CT scan shows an abnormality.",         es:"La tomografía muestra una anormalidad.",          phrase_en:"Imaging results",     phrase_es:"Resultados de imagen" },
      { id:"dx8",  en:"We are consulting a specialist.",           es:"Estamos consultando a un especialista.",          phrase_en:"Specialist consult",  phrase_es:"Consulta especializada" },
      { id:"dx9",  en:"This medication may have side effects.",    es:"Este medicamento puede tener efectos secundarios.",phrase_en:"Side effects",       phrase_es:"Efectos secundarios" },
      { id:"dx10", en:"We need to monitor you closely.",           es:"Necesitamos vigilarle de cerca.",                phrase_en:"Monitoring plan",     phrase_es:"Plan de seguimiento" },
      { id:"dx11", en:"The blood cultures are pending.",           es:"Los cultivos de sangre están pendientes.",        phrase_en:"Pending results",     phrase_es:"Resultados pendientes" },
      { id:"dx12", en:"I want to explain your diagnosis clearly.", es:"Quiero explicarle su diagnóstico con claridad.",  phrase_en:"Diagnosis discussion",phrase_es:"Discusión del diagnóstico" },
    ],
    advanced: [
      { id:"dx13", en:"We are discussing your case as a team.",            es:"Estamos discutiendo su caso en equipo.",                              phrase_en:"MDT discussion",        phrase_es:"Discusión multidisciplinaria" },
      { id:"dx14", en:"The risks include bleeding and infection.",         es:"Los riesgos incluyen sangrado e infección.",                          phrase_en:"Informed consent",      phrase_es:"Consentimiento informado" },
      { id:"dx15", en:"We are starting a sepsis protocol.",                es:"Estamos iniciando un protocolo de sepsis.",                           phrase_en:"Sepsis management",     phrase_es:"Manejo de sepsis" },
      { id:"dx16", en:"I need to discuss goals of care with your family.", es:"Necesito hablar sobre los objetivos del tratamiento con su familia.", phrase_en:"Goals of care",         phrase_es:"Objetivos del tratamiento" },
      { id:"dx17", en:"We are weighing the risks and benefits.",           es:"Estamos evaluando los riesgos y beneficios.",                         phrase_en:"Risk-benefit analysis", phrase_es:"Análisis riesgo-beneficio" },
      { id:"dx18", en:"Test accuracy influences our decision.",            es:"La precisión de la prueba influye en nuestra decisión.",              phrase_en:"Test interpretation",   phrase_es:"Interpretación de prueba" },
    ],
  },
  {
    id: "discharge", label: "Discharge", emoji: "🏠",
    beginner: [
      { id:"dc1", en:"You are ready to go home.",                es:"Ya puede irse a casa.",                        phrase_en:"Discharge",          phrase_es:"Alta" },
      { id:"dc2", en:"Come back if symptoms worsen.",            es:"Regrese si los síntomas empeoran.",           phrase_en:"Return precautions", phrase_es:"Precauciones" },
      { id:"dc3", en:"Follow up in one week.",                   es:"Haga seguimiento en una semana.",             phrase_en:"Follow-up",          phrase_es:"Seguimiento" },
      { id:"dc4", en:"Rest and drink plenty of fluids.",         es:"Descanse y tome muchos líquidos.",            phrase_en:"Home care",          phrase_es:"Cuidado en casa" },
      { id:"dc5", en:"Do not drive while taking this medicine.", es:"No conduzca mientras tome este medicamento.", phrase_en:"Driving restriction", phrase_es:"Restricción" },
      { id:"dc6", en:"Call us if you have any concerns.",        es:"Llámenos si tiene alguna inquietud.",         phrase_en:"Contact info",       phrase_es:"Contacto" },
    ],
    intermediate: [
      { id:"dc7",  en:"Here is your list of discharge medications.",es:"Aquí tiene la lista de sus medicamentos al alta.", phrase_en:"Medication list",     phrase_es:"Lista de medicamentos" },
      { id:"dc8",  en:"Avoid lifting more than ten pounds.",        es:"Evite levantar más de diez libras.",              phrase_en:"Activity restriction", phrase_es:"Restricción de actividad" },
      { id:"dc9",  en:"Change the wound dressing once a day.",      es:"Cambie el vendaje de la herida una vez al día.",  phrase_en:"Wound care",          phrase_es:"Cuidado de herida" },
      { id:"dc10", en:"Keep your follow-up appointment.",           es:"Mantenga su cita de seguimiento.",                phrase_en:"Appointment reminder",phrase_es:"Recordatorio de cita" },
      { id:"dc11", en:"Do you understand all the instructions?",    es:"¿Entiende todas las instrucciones?",              phrase_en:"Teach-back",          phrase_es:"Confirmación" },
      { id:"dc12", en:"Avoid alcohol while on this antibiotic.",    es:"Evite el alcohol mientras tome este antibiótico.", phrase_en:"Drug interaction",    phrase_es:"Interacción" },
    ],
    advanced: [
      { id:"dc13", en:"Keep a symptom diary and bring it to your visit.",      es:"Lleve un diario de síntomas y tráigalo a su cita.",                        phrase_en:"Symptom monitoring",   phrase_es:"Monitoreo de síntomas" },
      { id:"dc14", en:"We are arranging home health services for you.",        es:"Estamos organizando servicios de salud en casa para usted.",               phrase_en:"Home health",          phrase_es:"Salud en el hogar" },
      { id:"dc15", en:"Your oxygen levels need to be monitored at home.",      es:"Sus niveles de oxígeno deben ser monitoreados en casa.",                   phrase_en:"Home O2 monitoring",   phrase_es:"Control de O2 en casa" },
      { id:"dc16", en:"If you develop fever or redness at the wound, go to the ER.",es:"Si desarrolla fiebre o enrojecimiento en la herida, vaya a urgencias.",phrase_en:"Emergency precautions",phrase_es:"Precauciones de emergencia" },
      { id:"dc17", en:"The rehab team will help you regain function.",         es:"El equipo de rehabilitación le ayudará a recuperar la función.",           phrase_en:"Rehab referral",       phrase_es:"Derivación a rehabilitación" },
      { id:"dc18", en:"We have sent your records to your primary care doctor.",es:"Hemos enviado sus registros a su médico de atención primaria.",            phrase_en:"Care coordination",   phrase_es:"Coordinación de atención" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LESSON PLAN  –  one lesson per group per level, ordered Beg → Int → Adv
// ─────────────────────────────────────────────────────────────────────────────

const ALL_GROUPS = [...BODY_SYSTEMS, ...CLINICAL_SCENARIOS];

function buildLessons() {
  const lessons = [];
  ["beginner","intermediate","advanced"].forEach(level => {
    ALL_GROUPS.forEach(group => {
      const terms = group[level] || [];
      if (terms.length === 0) return;
      lessons.push({
        id: `${group.id}__${level}`,
        groupId: group.id,
        level,
        label: group.label,
        emoji: group.emoji,
        terms,
      });
    });
  });
  return lessons;
}

const LESSONS = buildLessons();
const LESSON_KEY = "medesp_lessons_v4";

function loadLessonProgress() {
  try { return JSON.parse(localStorage.getItem(LESSON_KEY) || "{}"); } catch { return {}; }
}
function saveLessonProgress(d) {
  try { localStorage.setItem(LESSON_KEY, JSON.stringify(d)); } catch {} }

// A lesson is unlocked if all lessons in the PREVIOUS level are passed,
// or it is the first level. Within a level, lessons unlock sequentially.
function isLessonUnlocked(lessons, lessonProg, idx) {
  if (idx === 0) return true;
  const lesson = lessons[idx];
  const level = lesson.level;
  const levelOrder = ["beginner","intermediate","advanced"];
  const levelIdx = levelOrder.indexOf(level);

  // First lesson of intermediate or advanced: all previous-level lessons must be passed
  const firstOfLevel = lessons.findIndex(l => l.level === level) === idx;
  if (firstOfLevel && levelIdx > 0) {
    const prevLevel = levelOrder[levelIdx - 1];
    return lessons.filter(l => l.level === prevLevel).every(l => lessonProg[l.id]?.passed);
  }

  // Otherwise: previous lesson in same level must be passed
  const prevSameLevel = [...lessons].slice(0, idx).reverse().find(l => l.level === level);
  if (prevSameLevel) return !!lessonProg[prevSameLevel.id]?.passed;
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const LEVELS = ["beginner","intermediate","advanced"];

function termsForGroup(group, level) {
  if (level === "all") return [...(group.beginner||[]),...(group.intermediate||[]),...(group.advanced||[])];
  return group[level] || [];
}

function allTermsForLevel(level) {
  return [
    ...BODY_SYSTEMS.flatMap(g => termsForGroup(g, level)),
    ...CLINICAL_SCENARIOS.flatMap(g => termsForGroup(g, level)),
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// SRS
// ─────────────────────────────────────────────────────────────────────────────

const SRS_KEY  = "medesp_srs_v4";
const PROG_KEY = "medesp_prog_v4";

function loadSRS()  { try { return JSON.parse(localStorage.getItem(SRS_KEY)  || "{}"); } catch { return {}; } }
function saveSRS(d) { try { localStorage.setItem(SRS_KEY,  JSON.stringify(d)); } catch {} }
function loadProg() { try { return JSON.parse(localStorage.getItem(PROG_KEY) || "{}"); } catch { return {}; } }
function saveProg(d){ try { localStorage.setItem(PROG_KEY, JSON.stringify(d)); } catch {} }

function getCard(srs, id) { return srs[id] || { interval:1, ef:2.5, due:0, reviews:0, correct:0 }; }

function isMastered(srs, id) {
  const c = getCard(srs, id);
  return c.reviews >= 3 && c.correct / c.reviews >= 0.7;
}

function updateCard(card, rating) {
  let { interval, ef, reviews, correct } = card;
  reviews++;
  if (rating >= 2) correct++;
  if (rating === 0) interval = 1;
  else if (rating === 1) interval = Math.max(1, Math.round(interval * 0.8));
  else if (reviews === 1) interval = 1;
  else if (reviews === 2) interval = 6;
  else interval = Math.round(interval * ef);
  if (rating >= 2) ef = Math.max(1.3, ef + 0.1 - (3 - rating) * (0.08 + (3 - rating) * 0.02));
  return { interval, ef, due: Date.now() + interval * 86400000, reviews, correct };
}

function getDueCards(srs, level) {
  const now = Date.now();
  return allTermsForLevel(level).filter(t => getCard(srs, t.id).due <= now);
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-MX"; u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function btn(bg="#1e293b", bc="#334155", c="#94a3b8") {
  return { background:bg, border:`1px solid ${bc}`, borderRadius:10, padding:"10px 22px", color:c, cursor:"pointer", fontSize:13, fontWeight:600 };
}

const LEVEL_META = {
  beginner:     { label:"Beginner",     color:"#22c55e", bg:"#052e16", bc:"#16a34a" },
  intermediate: { label:"Intermediate", color:"#f59e0b", bg:"#451a03", bc:"#d97706" },
  advanced:     { label:"Advanced",     color:"#f87171", bg:"#450a0a", bc:"#dc2626" },
};

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function Flashcard({ term, showPhrase, onNext, onPrev, index, total, onRate, srs, hideRating }) {
  const [flipped, setFlipped] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => setFlipped(false), [term]);

  function handleRate(r) {
    setFlipped(false);
    setTransitioning(true);
    setTimeout(() => { setTransitioning(false); onRate(r); }, 480);
  }

  const front = showPhrase ? term.phrase_en : term.en;
  const back  = showPhrase ? term.phrase_es : term.es;
  const mastered = isMastered(srs, term.id);

  const face = (visible, grad, border) => ({
    position:"absolute", inset:0,
    background:grad, border:`1px solid ${border}`, borderRadius:22,
    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:28,
    backfaceVisibility:"hidden",
    transform: visible ? "rotateY(0deg)" : "rotateY(180deg)",
    transition:"transform 0.45s ease",
    boxShadow:"0 8px 32px rgba(0,0,0,0.5)",
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:18 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ fontSize:12, color:"#64748b", letterSpacing:2 }}>{index+1} / {total}</span>
        {mastered && <span style={{ fontSize:10, background:"#14532d", color:"#4ade80", padding:"2px 8px", borderRadius:99, fontWeight:700 }}>Mastered</span>}
      </div>

      <div onClick={() => !transitioning && setFlipped(f => !f)}
        style={{ width:"min(500px,92vw)", height:260, cursor:"pointer", perspective:1000, position:"relative" }}>
        <div style={face(!flipped, "linear-gradient(135deg,#1e3a5f,#0f2340)", "#2d5a8e")}>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:3, color:"#64b5f6", marginBottom:12 }}>English</div>
          <div style={{ fontSize:22, fontWeight:700, color:"#e2e8f0", textAlign:"center", lineHeight:1.45 }}>{front}</div>
          <div style={{ fontSize:11, color:"#334155", marginTop:16 }}>tap to reveal Spanish</div>
        </div>
        <div style={face(flipped, "linear-gradient(135deg,#14532d,#052e16)", "#16a34a")}>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:3, color:"#4ade80", marginBottom:12 }}>Español</div>
          <div style={{ fontSize:22, fontWeight:700, color:"#dcfce7", textAlign:"center", lineHeight:1.45 }}>{back}</div>
          <button onClick={e => { e.stopPropagation(); speak(back); }} style={{
            marginTop:12, background:"rgba(74,222,128,0.12)", border:"1px solid #4ade80",
            borderRadius:8, padding:"5px 14px", color:"#4ade80", cursor:"pointer", fontSize:12,
          }}>🔊 Pronounce</button>
        </div>
      </div>

      {flipped && onRate && !transitioning && !hideRating && (
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
          {[
            { label:"😕 Again", r:0, bg:"#450a0a", bc:"#dc2626", c:"#fca5a5" },
            { label:"😐 Hard",  r:1, bg:"#422006", bc:"#ea580c", c:"#fed7aa" },
            { label:"🙂 Good",  r:2, bg:"#1e3a5f", bc:"#3b82f6", c:"#bfdbfe" },
            { label:"😄 Easy",  r:3, bg:"#14532d", bc:"#16a34a", c:"#86efac" },
          ].map(({ label, r, bg, bc, c }) => (
            <button key={r} onClick={() => handleRate(r)} style={{
              background:bg, border:`1px solid ${bc}`, borderRadius:10,
              padding:"8px 14px", color:c, cursor:"pointer", fontSize:12, fontWeight:600,
            }}>{label}</button>
          ))}
        </div>
      )}

      <div style={{ display:"flex", gap:10 }}>
        <button onClick={onPrev} style={btn()}>Prev</button>
        <button onClick={onNext} style={btn("#1e40af","#3b82f6","#bfdbfe")}>Next</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LESSON QUIZ  –  4 questions, must pass 3/4
// ─────────────────────────────────────────────────────────────────────────────

function LessonQuiz({ terms, onPass, onFail }) {
  const allTerms = ALL_GROUPS.flatMap(g => [...(g.beginner||[]),...(g.intermediate||[]),...(g.advanced||[])]);

  function build() {
    return shuffle(terms).slice(0, 4).map(t => {
      const correct = t.es;
      const pool = shuffle(allTerms.filter(x => x.id !== t.id)).slice(0,3).map(x => x.es);
      return { q: `"${t.en}" in Spanish:`, opts: shuffle([correct, ...pool]), correct, id: t.id };
    });
  }

  const [qs]            = useState(build);
  const [cur, setCur]   = useState(0);
  const [sel, setSel]   = useState(null);
  const [score, setScore]= useState(0);
  const [done, setDone] = useState(false);

  function pick(opt) {
    if (sel) return;
    setSel(opt);
    const ok = opt === qs[cur].correct;
    if (ok) setScore(s => s + 1);
  }

  function next() {
    const newScore = score + (sel === qs[cur].correct ? 0 : 0); // already counted
    if (cur + 1 >= qs.length) { setDone(true); return; }
    setCur(c => c + 1); setSel(null);
  }

  if (done) {
    const passed = score >= 3;
    return (
      <div style={{ textAlign:"center", padding:"32px 20px" }}>
        <div style={{ fontSize:52, marginBottom:12 }}>{passed ? "🎉" : "📖"}</div>
        <div style={{ fontSize:28, fontWeight:800, color:"#e2e8f0", marginBottom:6 }}>{score} / {qs.length}</div>
        <div style={{ color: passed ? "#4ade80" : "#f87171", fontSize:15, fontWeight:700, marginBottom:8 }}>
          {passed ? "Lesson Complete!" : "Not quite — try again!"}
        </div>
        <div style={{ color:"#64748b", fontSize:13, marginBottom:28 }}>
          {passed ? "Next lesson is now unlocked." : "You need 3/4 to pass."}
        </div>
        {passed
          ? <button onClick={onPass} style={btn("#14532d","#16a34a","#4ade80")}>Continue</button>
          : <button onClick={onFail} style={btn("#1e40af","#3b82f6","#bfdbfe")}>Review Cards</button>
        }
      </div>
    );
  }

  const q = qs[cur];
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
      <div style={{ fontSize:13, fontWeight:700, color:"#94a3b8" }}>Lesson Quiz — {cur + 1} / {qs.length}</div>
      <div style={{ width:"min(500px,92vw)", background:"#0f172a", border:"1px solid #1e293b", borderRadius:20, padding:24 }}>
        <div style={{ fontSize:17, fontWeight:700, color:"#e2e8f0", marginBottom:18, lineHeight:1.5 }}>{q.q}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
          {q.opts.map(opt => {
            let bg="#1e293b", bc="#334155", c="#cbd5e1";
            if (sel) {
              if (opt === q.correct) { bg="#14532d"; bc="#16a34a"; c="#86efac"; }
              else if (opt === sel)  { bg="#450a0a"; bc="#dc2626"; c="#fca5a5"; }
            }
            return (
              <button key={opt} onClick={() => pick(opt)} style={{
                background:bg, border:`1px solid ${bc}`, borderRadius:12,
                padding:"11px 14px", color:c, cursor:sel?"default":"pointer",
                textAlign:"left", fontSize:14, fontWeight:500, transition:"all 0.15s",
              }}>{opt}</button>
            );
          })}
        </div>
        {sel && (
          <button onClick={next} style={{ ...btn("#1e40af","#3b82f6","#bfdbfe"), marginTop:16, width:"100%", textAlign:"center" }}>
            {cur + 1 >= qs.length ? "See Results" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVE LESSON  –  cards then quiz
// ─────────────────────────────────────────────────────────────────────────────

function ActiveLesson({ lesson, onComplete, onBack }) {
  const [phase, setPhase] = useState("cards"); // "cards" | "quiz"
  const [cardIdx, setCardIdx] = useState(0);
  const fakeSRS = {};

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ ...btn(), padding:"6px 14px", fontSize:12 }}>Back</button>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:"#e2e8f0" }}>{lesson.emoji} {lesson.label}</div>
          <div style={{ fontSize:11, color: LEVEL_META[lesson.level].color }}>{LEVEL_META[lesson.level].label}</div>
        </div>
        <div style={{ marginLeft:"auto", fontSize:12, color:"#475569" }}>
          {phase === "cards" ? `Cards ${cardIdx+1}/${lesson.terms.length}` : "Quiz"}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background:"#1e293b", borderRadius:99, height:4, overflow:"hidden", marginBottom:24 }}>
        <div style={{
          width: phase === "quiz" ? "100%" : `${Math.round((cardIdx+1)/lesson.terms.length*100)}%`,
          background: LEVEL_META[lesson.level].color,
          height:"100%", borderRadius:99, transition:"width 0.4s ease",
        }} />
      </div>

      {phase === "cards" && (
        <>
          <Flashcard
            term={lesson.terms[cardIdx]}
            showPhrase={false}
            index={cardIdx}
            total={lesson.terms.length}
            onNext={() => {
              if (cardIdx + 1 >= lesson.terms.length) setPhase("quiz");
              else setCardIdx(i => i + 1);
            }}
            onPrev={() => cardIdx > 0 && setCardIdx(i => i - 1)}
            onRate={() => {}}
            srs={fakeSRS}
            hideRating={true}
          />
          {cardIdx === lesson.terms.length - 1 && (
            <div style={{ textAlign:"center", marginTop:20 }}>
              <button onClick={() => setPhase("quiz")} style={btn("#1e40af","#3b82f6","#bfdbfe")}>
                Take Quiz
              </button>
            </div>
          )}
        </>
      )}

      {phase === "quiz" && (
        <LessonQuiz
          terms={lesson.terms}
          onPass={() => onComplete(true)}
          onFail={() => { setPhase("cards"); setCardIdx(0); }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LESSONS MAP  –  scrollable lesson list grouped by level
// ─────────────────────────────────────────────────────────────────────────────

function LessonsMap({ lessonProg, onSelectLesson }) {
  const levelOrder = ["beginner","intermediate","advanced"];
  const levelGroups = levelOrder.map(level => ({
    level,
    lessons: LESSONS.filter(l => l.level === level),
  }));

  const totalLessons = LESSONS.length;
  const passedLessons = LESSONS.filter(l => lessonProg[l.id]?.passed).length;
  const overallPct = Math.round(passedLessons / totalLessons * 100);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
      {/* Overall progress */}
      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"16px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#94a3b8" }}>Overall Progress</span>
          <span style={{ fontSize:13, fontWeight:700, color:"#60a5fa" }}>{passedLessons}/{totalLessons} lessons</span>
        </div>
        <div style={{ background:"#1e293b", borderRadius:99, height:8, overflow:"hidden" }}>
          <div style={{ width:`${overallPct}%`, background:"linear-gradient(90deg,#3b82f6,#22c55e)", height:"100%", borderRadius:99, transition:"width 0.6s ease" }} />
        </div>
      </div>

      {/* Level sections */}
      {levelGroups.map(({ level, lessons }) => {
        const lm = LEVEL_META[level];
        const passed = lessons.filter(l => lessonProg[l.id]?.passed).length;
        const levelUnlocked = lessons.some((l, i) => isLessonUnlocked(LESSONS, lessonProg, LESSONS.indexOf(l)));

        return (
          <div key={level}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ height:1, flex:1, background:"#1e293b" }} />
              <span style={{ fontSize:12, fontWeight:700, color: levelUnlocked ? lm.color : "#334155",
                background: levelUnlocked ? lm.bg : "#0f172a",
                border:`1px solid ${levelUnlocked ? lm.bc : "#1e293b"}`,
                padding:"3px 12px", borderRadius:99
              }}>
                {lm.label} — {passed}/{lessons.length}
              </span>
              <div style={{ height:1, flex:1, background:"#1e293b" }} />
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {lessons.map((lesson, localIdx) => {
                const globalIdx = LESSONS.indexOf(lesson);
                const unlocked = isLessonUnlocked(LESSONS, lessonProg, globalIdx);
                const passed   = lessonProg[lesson.id]?.passed;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => unlocked && onSelectLesson(lesson)}
                    style={{
                      background: passed ? "#0d2a1a" : unlocked ? "#0f172a" : "#080f1a",
                      border: `1px solid ${passed ? "#16a34a" : unlocked ? "#1e3a5f" : "#111827"}`,
                      borderRadius:14, padding:"14px 18px",
                      display:"flex", alignItems:"center", gap:14,
                      cursor: unlocked ? "pointer" : "default",
                      textAlign:"left", opacity: unlocked ? 1 : 0.45,
                      transition:"all 0.15s",
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width:42, height:42, borderRadius:12, flexShrink:0,
                      background: passed ? "#14532d" : unlocked ? "#1e293b" : "#0f172a",
                      border: `1px solid ${passed ? "#16a34a" : "#1e293b"}`,
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:20,
                    }}>
                      {passed ? "✓" : unlocked ? lesson.emoji : "🔒"}
                    </div>

                    {/* Text */}
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700, color: passed ? "#4ade80" : unlocked ? "#e2e8f0" : "#475569" }}>
                        {lesson.label}
                      </div>
                      <div style={{ fontSize:11, color:"#475569", marginTop:2 }}>
                        {lesson.terms.length} cards
                        {passed && " · Passed"}
                        {!unlocked && " · Locked"}
                      </div>
                    </div>

                    {/* Arrow */}
                    {unlocked && !passed && (
                      <div style={{ fontSize:16, color:"#3b82f6" }}>→</div>
                    )}
                    {passed && (
                      <div style={{ fontSize:11, background:"#14532d", color:"#4ade80", padding:"2px 8px", borderRadius:99, fontWeight:700 }}>
                        Done
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW MODE
// ─────────────────────────────────────────────────────────────────────────────

function ReviewMode({ srs, onUpdateSRS, level }) {
  const [queue]          = useState(() => shuffle(getDueCards(srs, level)).slice(0, 20));
  const [idx, setIdx]    = useState(0);
  const [done, setDone]  = useState(false);
  const [correct, setCorrect] = useState(0);
  const [localSRS, setLocalSRS] = useState(srs);

  function handleRate(rating) {
    const term = queue[idx];
    const updated = updateCard(getCard(localSRS, term.id), rating);
    const newSRS = { ...localSRS, [term.id]: updated };
    setLocalSRS(newSRS);
    onUpdateSRS(term.id, updated);
    if (rating >= 2) setCorrect(c => c + 1);
    if (idx + 1 >= queue.length) setDone(true);
    else setIdx(i => i + 1);
  }

  if (queue.length === 0) return (
    <div style={{ textAlign:"center", padding:"48px 20px" }}>
      <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
      <div style={{ fontSize:22, fontWeight:700, color:"#e2e8f0", marginBottom:8 }}>All caught up!</div>
      <div style={{ color:"#475569" }}>No cards due right now. Come back later!</div>
    </div>
  );

  if (done) return (
    <div style={{ textAlign:"center", padding:"48px 20px" }}>
      <div style={{ fontSize:52, marginBottom:12 }}>{correct >= queue.length * 0.75 ? "⭐" : "📚"}</div>
      <div style={{ fontSize:30, fontWeight:800, color:"#e2e8f0", marginBottom:6 }}>{correct}/{queue.length}</div>
      <div style={{ color:"#94a3b8", marginBottom:28 }}>{correct >= queue.length * 0.75 ? "Excelente trabajo!" : "Keep practicing!"}</div>
      <button onClick={() => window.location.reload()} style={btn("#1e40af","#3b82f6","#bfdbfe")}>Done</button>
    </div>
  );

  const term = queue[idx];
  const group = ALL_GROUPS.find(g => [...(g.beginner||[]),...(g.intermediate||[]),...(g.advanced||[])].some(t => t.id === term.id));

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
        <span style={{ fontSize:11, background:"#1e293b", color:"#64748b", padding:"3px 10px", borderRadius:99 }}>{group?.emoji} {group?.label}</span>
        <span style={{ fontSize:11, color:"#475569" }}>{idx + 1} of {queue.length}</span>
      </div>
      <Flashcard
        term={term} showPhrase={false} index={idx} total={queue.length}
        onNext={() => idx + 1 < queue.length ? setIdx(i => i + 1) : setDone(true)}
        onPrev={() => idx > 0 && setIdx(i => i - 1)}
        onRate={handleRate} srs={localSRS}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPLORE QUIZ
// ─────────────────────────────────────────────────────────────────────────────

function Quiz({ terms, onProgressUpdate }) {
  const [dir, setDir]     = useState("es");
  const [mode, setMode]   = useState("vocab");
  const [qs, setQs]       = useState([]);
  const [cur, setCur]     = useState(0);
  const [sel, setSel]     = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone]   = useState(false);

  const allTermsPool = ALL_GROUPS.flatMap(g => [...(g.beginner||[]),...(g.intermediate||[]),...(g.advanced||[])]);

  function build(d, m) {
    return shuffle(terms).slice(0, Math.min(8, terms.length)).map(t => {
      const isPhrase = m === "phrase";
      const correct  = isPhrase ? (d === "es" ? t.phrase_es : t.phrase_en) : (d === "es" ? t.es : t.en);
      const qText    = isPhrase
        ? (d === "es" ? `Phrase: "${t.phrase_en}"` : `Frase: "${t.phrase_es}"`)
        : (d === "es" ? `Word: "${t.en}"` : `Palabra: "${t.es}"`);
      const pool = shuffle(allTermsPool.filter(x => x.id !== t.id)).slice(0, 3).map(x =>
        isPhrase ? (d === "es" ? x.phrase_es : x.phrase_en) : (d === "es" ? x.es : x.en)
      );
      return { q: qText, opts: shuffle([correct, ...pool]), correct, id: t.id };
    });
  }

  useEffect(() => {
    const q = build(dir, mode);
    setQs(q); setCur(0); setSel(null); setScore(0); setDone(false);
  }, [terms, dir, mode]);

  function pick(opt) {
    if (sel) return;
    setSel(opt);
    const ok = opt === qs[cur].correct;
    if (ok) setScore(s => s + 1);
    onProgressUpdate?.(qs[cur].id, ok);
  }

  function next() {
    if (cur + 1 >= qs.length) { setDone(true); return; }
    setCur(c => c + 1); setSel(null);
  }

  function restart() {
    const q = build(dir, mode);
    setQs(q); setCur(0); setSel(null); setScore(0); setDone(false);
  }

  if (!qs.length) return null;

  if (done) return (
    <div style={{ textAlign:"center", padding:"40px 20px" }}>
      <div style={{ fontSize:52 }}>{score >= qs.length * 0.75 ? "🏆" : "📖"}</div>
      <div style={{ fontSize:30, fontWeight:800, color:"#e2e8f0", margin:"12px 0 6px" }}>{score}/{qs.length}</div>
      <div style={{ color:"#94a3b8", marginBottom:28 }}>{score >= qs.length * 0.75 ? "Muy bien!" : "Keep practicing!"}</div>
      <button onClick={restart} style={btn("#1e40af","#3b82f6","#bfdbfe")}>Try Again</button>
    </div>
  );

  const q = qs[cur];
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
        <div style={{ display:"flex", gap:4, background:"#0f172a", borderRadius:10, padding:3 }}>
          {[{v:"es",l:"EN to ES"},{v:"en",l:"ES to EN"}].map(({ v, l }) => (
            <button key={v} onClick={() => setDir(v)} style={{
              background:dir===v?"#1e293b":"transparent", border:"none",
              borderRadius:8, padding:"6px 14px", color:dir===v?"#e2e8f0":"#475569",
              cursor:"pointer", fontSize:12, fontWeight:600,
            }}>{l}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:4, background:"#0f172a", borderRadius:10, padding:3 }}>
          {[{v:"vocab",l:"Vocab"},{v:"phrase",l:"Phrases"}].map(({ v, l }) => (
            <button key={v} onClick={() => setMode(v)} style={{
              background:mode===v?"#1e293b":"transparent", border:"none",
              borderRadius:8, padding:"6px 14px", color:mode===v?"#e2e8f0":"#475569",
              cursor:"pointer", fontSize:12, fontWeight:600,
            }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ fontSize:12, color:"#475569" }}>{cur + 1}/{qs.length} Score: {score}</div>
      <div style={{ width:"min(500px,92vw)", background:"#0f172a", border:"1px solid #1e293b", borderRadius:20, padding:24 }}>
        <div style={{ fontSize:16, fontWeight:700, color:"#e2e8f0", marginBottom:18, lineHeight:1.5 }}>{q.q}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
          {q.opts.map(opt => {
            let bg="#1e293b", bc="#334155", c="#cbd5e1";
            if (sel) {
              if (opt === q.correct) { bg="#14532d"; bc="#16a34a"; c="#86efac"; }
              else if (opt === sel)  { bg="#450a0a"; bc="#dc2626"; c="#fca5a5"; }
            }
            return (
              <button key={opt} onClick={() => pick(opt)} style={{
                background:bg, border:`1px solid ${bc}`, borderRadius:12,
                padding:"10px 14px", color:c, cursor:sel?"default":"pointer",
                textAlign:"left", fontSize:13, fontWeight:500, lineHeight:1.4, transition:"all 0.15s",
              }}>{opt}</button>
            );
          })}
        </div>
        {sel && (
          <button onClick={next} style={{ ...btn("#1e40af","#3b82f6","#bfdbfe"), marginTop:16, width:"100%", textAlign:"center" }}>
            {cur + 1 >= qs.length ? "See Results" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHRASE BANK
// ─────────────────────────────────────────────────────────────────────────────

function PhraseBank({ terms }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10, width:"min(540px,92vw)" }}>
      {terms.map((t, i) => (
        <div key={i} style={{
          background:"#0f172a", border:"1px solid #1e293b", borderRadius:14,
          padding:"14px 18px", display:"flex", justifyContent:"space-between",
          alignItems:"center", gap:12, flexWrap:"wrap",
        }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, color:"#64b5f6", marginBottom:3 }}>{t.phrase_en}</div>
            <div style={{ fontSize:15, fontWeight:700, color:"#e2e8f0" }}>{t.phrase_es}</div>
          </div>
          <button onClick={() => speak(t.phrase_es)} style={{
            background:"rgba(74,222,128,0.1)", border:"1px solid #16a34a",
            borderRadius:8, padding:"6px 12px", color:"#4ade80", cursor:"pointer", fontSize:13,
          }}>🔊</button>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

function ProgressDashboard({ srs, progress }) {
  const [view, setView] = useState("beginner");
  const levelTerms = allTermsForLevel(view);
  const total    = levelTerms.length;
  const reviewed = levelTerms.filter(t => getCard(srs, t.id).reviews > 0).length;
  const mastered = levelTerms.filter(t => isMastered(srs, t.id)).length;
  const due      = getDueCards(srs, view).length;
  const qTotal   = Object.values(progress).reduce((a, b) => a + b.total, 0);
  const qCorrect = Object.values(progress).reduce((a, b) => a + b.correct, 0);
  const accuracy = qTotal > 0 ? Math.round(qCorrect / qTotal * 100) : 0;
  const lm = LEVEL_META[view];

  const sysStats = BODY_SYSTEMS.map(s => {
    const lt = termsForGroup(s, view);
    const mc = lt.filter(t => isMastered(srs, t.id)).length;
    return { ...s, mc, total: lt.length, pct: lt.length ? Math.round(mc / lt.length * 100) : 0 };
  });

  return (
    <div style={{ width:"min(600px,96vw)", display:"flex", flexDirection:"column", gap:18 }}>
      <div style={{ display:"flex", gap:6, background:"#0f172a", borderRadius:12, padding:4 }}>
        {LEVELS.map(l => {
          const m = LEVEL_META[l];
          return (
            <button key={l} onClick={() => setView(l)} style={{
              flex:1, background:view===l?m.bg:"transparent",
              border:view===l?`1px solid ${m.bc}`:"none",
              borderRadius:9, padding:"8px 0",
              color:view===l?m.color:"#475569",
              cursor:"pointer", fontSize:12, fontWeight:view===l?700:400,
            }}>{m.label}</button>
          );
        })}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[
          { label:"Reviewed",       val:reviewed,      sub:`of ${total}`,          color:"#3b82f6" },
          { label:"Mastered",       val:mastered,       sub:`of ${total}`,          color:lm.color },
          { label:"Due for Review", val:due,            sub:"cards pending",        color:"#f59e0b" },
          { label:"Quiz Accuracy",  val:`${accuracy}%`, sub:`${qCorrect}/${qTotal}`,color:"#a78bfa" },
        ].map(({ label, val, sub, color }) => (
          <div key={label} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"16px 18px" }}>
            <div style={{ fontSize:11, color:"#475569", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:800, color }}>{val}</div>
            <div style={{ fontSize:11, color:"#334155", marginTop:2 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"18px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#94a3b8" }}>Overall Mastery — {lm.label}</span>
          <span style={{ fontSize:13, color:lm.color, fontWeight:700 }}>{total ? Math.round(mastered / total * 100) : 0}%</span>
        </div>
        <div style={{ background:"#1e293b", borderRadius:99, height:10, overflow:"hidden" }}>
          <div style={{ width:`${total ? Math.round(mastered / total * 100) : 0}%`, background:`linear-gradient(90deg,#3b82f6,${lm.color})`, height:"100%", borderRadius:99, transition:"width 0.6s ease" }} />
        </div>
      </div>

      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"18px 20px" }}>
        <div style={{ fontSize:13, fontWeight:600, color:"#94a3b8", marginBottom:16 }}>Progress by Body System — {lm.label}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {sysStats.map(s => (
            <div key={s.id}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:13, color:"#cbd5e1" }}>{s.emoji} {s.label}</span>
                <span style={{ fontSize:11, color:"#475569" }}>{s.mc}/{s.total}</span>
              </div>
              <div style={{ background:"#1e293b", borderRadius:99, height:6, overflow:"hidden" }}>
                <div style={{ width:`${s.pct}%`, background:s.pct===100?lm.color:s.pct>50?"#3b82f6":"#f59e0b", height:"100%", borderRadius:99, transition:"width 0.5s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => {
        if (window.confirm("Reset all progress? This cannot be undone.")) {
          localStorage.removeItem(SRS_KEY); localStorage.removeItem(PROG_KEY);
          localStorage.removeItem(LESSON_KEY); window.location.reload();
        }
      }} style={{ ...btn(), fontSize:12, alignSelf:"center", opacity:0.45 }}>Reset All Progress</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [srs,          setSRS]         = useState(loadSRS);
  const [progress,     setProgress]    = useState(loadProg);
  const [lessonProg,   setLessonProg]  = useState(loadLessonProgress);
  const [mainTab,      setMainTab]     = useState("lessons");
  const [activeLesson, setActiveLesson]= useState(null);

  // Explore state
  const [level,      setLevel]      = useState("beginner");
  const [orgMode,    setOrgMode]    = useState("system");
  const [activeId,   setActiveId]   = useState("cardiovascular");
  const [tab,        setTab]        = useState("flashcards");
  const [cardIdx,    setCardIdx]    = useState(0);
  const [showPhrase, setShowPhrase] = useState(false);

  const groups   = orgMode === "system" ? BODY_SYSTEMS : CLINICAL_SCENARIOS;
  const active   = groups.find(g => g.id === activeId) || groups[0];
  const terms    = termsForGroup(active, level);
  const dueCount = getDueCards(srs, level).length;

  useEffect(() => { setActiveId(groups[0].id); setCardIdx(0); }, [orgMode]);
  useEffect(() => { setCardIdx(0); }, [activeId, level]);

  function updateSRS(id, card) { const u = {...srs,[id]:card}; setSRS(u); saveSRS(u); }
  function updateProg(id, ok) {
    const p = progress[id] || { correct:0, total:0 };
    const u = { ...progress, [id]:{ correct:p.correct+(ok?1:0), total:p.total+1 } };
    setProgress(u); saveProg(u);
  }
  function handleRate(rating) {
    const t = terms[cardIdx];
    updateSRS(t.id, updateCard(getCard(srs, t.id), rating));
    updateProg(t.id, rating >= 2);
    setCardIdx(i => (i + 1) % terms.length);
  }

  function completeLesson(lesson) {
    const u = { ...lessonProg, [lesson.id]: { passed: true, completedAt: Date.now() } };
    setLessonProg(u);
    saveLessonProgress(u);
    setActiveLesson(null);
  }

  const lm = LEVEL_META[level];
  const passedCount = LESSONS.filter(l => lessonProg[l.id]?.passed).length;

  return (
    <div style={{ minHeight:"100vh", background:"#020817", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#e2e8f0", paddingBottom:70 }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(180deg,#0a1628,#020817)", borderBottom:"1px solid #1e293b", padding:"16px 20px 0" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:26 }}>🩺</span>
              <div>
                <div style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.5px" }}>MedEspanol</div>
                <div style={{ fontSize:11, color:"#475569" }}>Medical Spanish for Residents</div>
              </div>
            </div>
            {dueCount > 0 && (
              <button onClick={() => { setMainTab("explore"); }} style={{
                background:"#422006", border:"1px solid #ea580c", borderRadius:10,
                padding:"5px 12px", color:"#fed7aa", fontSize:11, fontWeight:700, cursor:"pointer",
              }}>{dueCount} due</button>
            )}
          </div>

          <div style={{ display:"flex" }}>
            {[
              { id:"lessons", l:"Lessons" },
              { id:"explore", l:"Explore" },
              { id:"review",  l:`Review${dueCount > 0 ? ` (${dueCount})` : ""}` },
              { id:"progress",l:"Progress" },
            ].map(({ id, l }) => (
              <button key={id} onClick={() => setMainTab(id)} style={{
                background:"none", border:"none", padding:"9px 12px",
                color:mainTab===id?"#60a5fa":"#64748b",
                fontSize:13, fontWeight:mainTab===id?700:400, cursor:"pointer",
                borderBottom:mainTab===id?"2px solid #3b82f6":"2px solid transparent", marginBottom:-1,
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:700, margin:"0 auto", padding:"20px 14px" }}>

        {/* ── LESSONS TAB ── */}
        {mainTab === "lessons" && !activeLesson && (
          <LessonsMap
            lessonProg={lessonProg}
            onSelectLesson={setActiveLesson}
          />
        )}

        {mainTab === "lessons" && activeLesson && (
          <ActiveLesson
            lesson={activeLesson}
            onComplete={() => completeLesson(activeLesson)}
            onBack={() => setActiveLesson(null)}
          />
        )}

        {/* ── REVIEW TAB ── */}
        {mainTab === "review" && (
          <>
            <div style={{ display:"flex", gap:6, marginBottom:18, background:"#0f172a", borderRadius:12, padding:4 }}>
              {LEVELS.map(l => {
                const m = LEVEL_META[l];
                return (
                  <button key={l} onClick={() => setLevel(l)} style={{
                    flex:1, background:level===l?m.bg:"transparent",
                    border:level===l?`1px solid ${m.bc}`:"none",
                    borderRadius:9, padding:"9px 0", color:level===l?m.color:"#475569",
                    cursor:"pointer", fontSize:12, fontWeight:level===l?700:400,
                  }}>{m.label}</button>
                );
              })}
            </div>
            <ReviewMode srs={srs} onUpdateSRS={updateSRS} level={level} />
          </>
        )}

        {/* ── PROGRESS TAB ── */}
        {mainTab === "progress" && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
            <ProgressDashboard srs={srs} progress={progress} />
          </div>
        )}

        {/* ── EXPLORE TAB ── */}
        {mainTab === "explore" && (
          <>
            <div style={{ display:"flex", gap:6, marginBottom:18, background:"#0f172a", borderRadius:12, padding:4 }}>
              {LEVELS.map(l => {
                const m = LEVEL_META[l];
                return (
                  <button key={l} onClick={() => setLevel(l)} style={{
                    flex:1, background:level===l?m.bg:"transparent",
                    border:level===l?`1px solid ${m.bc}`:"none",
                    borderRadius:9, padding:"9px 0", color:level===l?m.color:"#475569",
                    cursor:"pointer", fontSize:12, fontWeight:level===l?700:400,
                  }}>{m.label}</button>
                );
              })}
            </div>

            <div style={{ display:"flex", gap:6, marginBottom:16, background:"#0f172a", borderRadius:12, padding:4 }}>
              {[{id:"system",l:"Body System"},{id:"scenario",l:"Clinical Scenario"}].map(({ id, l }) => (
                <button key={id} onClick={() => setOrgMode(id)} style={{
                  flex:1, background:orgMode===id?"#1e293b":"transparent", border:"none",
                  borderRadius:9, padding:"9px 0", color:orgMode===id?"#e2e8f0":"#475569",
                  cursor:"pointer", fontSize:13, fontWeight:orgMode===id?700:400,
                }}>{l}</button>
              ))}
            </div>

            <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:8, marginBottom:16 }}>
              {groups.map(g => {
                const gt  = termsForGroup(g, level);
                const mc  = gt.filter(t => isMastered(srs, t.id)).length;
                const pct = gt.length ? Math.round(mc / gt.length * 100) : 0;
                return (
                  <button key={g.id} onClick={() => setActiveId(g.id)} style={{
                    background:activeId===g.id?"#1e40af":"#0f172a",
                    border:`1px solid ${activeId===g.id?"#3b82f6":"#1e293b"}`,
                    borderRadius:10, padding:"7px 13px",
                    color:activeId===g.id?"#bfdbfe":"#64748b",
                    cursor:"pointer", fontSize:12, fontWeight:600, whiteSpace:"nowrap",
                  }}>
                    {g.emoji} {g.label}
                    {pct > 0 && <span style={{ marginLeft:5, fontSize:10, opacity:0.7 }}>{pct}%</span>}
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom:16 }}>
              <span style={{ fontSize:11, background:lm.bg, color:lm.color, border:`1px solid ${lm.bc}`, padding:"3px 10px", borderRadius:99, fontWeight:700 }}>
                {lm.label} — {terms.length} cards
              </span>
            </div>

            <div style={{ display:"flex", gap:6, marginBottom:20, background:"#0f172a", borderRadius:12, padding:4 }}>
              {[{id:"flashcards",l:"Flashcards"},{id:"quiz",l:"Quiz"},{id:"phrases",l:"Phrases"}].map(({ id, l }) => (
                <button key={id} onClick={() => setTab(id)} style={{
                  flex:1, background:tab===id?"#1e293b":"transparent", border:"none",
                  borderRadius:9, padding:"9px 0", color:tab===id?"#e2e8f0":"#475569",
                  cursor:"pointer", fontSize:13, fontWeight:tab===id?700:400,
                }}>{l}</button>
              ))}
            </div>

            {tab === "flashcards" && (
              <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
                <div style={{ display:"flex", gap:5, background:"#0f172a", borderRadius:10, padding:4 }}>
                  {[{v:false,l:"Vocabulary"},{v:true,l:"Clinical Phrases"}].map(({ v, l }) => (
                    <button key={l} onClick={() => setShowPhrase(v)} style={{
                      background:showPhrase===v?"#1e293b":"transparent", border:"none",
                      borderRadius:8, padding:"6px 14px", color:showPhrase===v?"#e2e8f0":"#475569",
                      cursor:"pointer", fontSize:12, fontWeight:600,
                    }}>{l}</button>
                  ))}
                </div>
              </div>
            )}

            {terms.length === 0 ? (
              <div style={{ textAlign:"center", padding:"40px 20px", color:"#475569" }}>No cards for this level yet.</div>
            ) : (
              <>
                {tab === "flashcards" && (
                  <Flashcard
                    term={terms[cardIdx]} showPhrase={showPhrase}
                    index={cardIdx} total={terms.length}
                    onNext={() => setCardIdx(i => (i + 1) % terms.length)}
                    onPrev={() => setCardIdx(i => (i - 1 + terms.length) % terms.length)}
                    onRate={handleRate} srs={srs}
                  />
                )}
                {tab === "quiz" && <Quiz terms={terms} onProgressUpdate={updateProg} />}
                {tab === "phrases" && <div style={{ display:"flex", justifyContent:"center" }}><PhraseBank terms={terms} /></div>}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
