// Database of useful/official Brazilian phone numbers

export interface UsefulNumber {
  number: string;
  name: string;
  category: "emergency" | "public" | "bank" | "utility" | "government";
  description: string;
  isTollFree?: boolean;
  isShortCode?: boolean;
}

export const usefulNumbers: UsefulNumber[] = [
  // Emergências (3 dígitos)
  {
    number: "190",
    name: "Polícia Militar",
    category: "emergency",
    description: "Emergências e ocorrências policiais",
    isShortCode: true,
  },
  {
    number: "193",
    name: "Bombeiros",
    category: "emergency",
    description: "Incêndios, resgates e emergências",
    isShortCode: true,
  },
  {
    number: "192",
    name: "SAMU",
    category: "emergency",
    description: "Serviço de Atendimento Móvel de Urgência",
    isShortCode: true,
  },
  {
    number: "191",
    name: "Polícia Rodoviária Federal",
    category: "emergency",
    description: "Emergências em rodovias federais",
    isShortCode: true,
  },
  {
    number: "197",
    name: "Polícia Civil",
    category: "emergency",
    description: "Investigações e ocorrências",
    isShortCode: true,
  },
  {
    number: "199",
    name: "Defesa Civil",
    category: "emergency",
    description: "Desastres naturais e emergências",
    isShortCode: true,
  },
  {
    number: "153",
    name: "Guarda Municipal",
    category: "emergency",
    description: "Segurança municipal",
    isShortCode: true,
  },
  
  // Direitos Humanos e Denúncias
  {
    number: "100",
    name: "Disque Direitos Humanos",
    category: "government",
    description: "Denúncias de violação de direitos humanos",
    isShortCode: true,
  },
  {
    number: "180",
    name: "Central de Atendimento à Mulher",
    category: "government",
    description: "Violência contra a mulher",
    isShortCode: true,
  },
  {
    number: "181",
    name: "Disque-Denúncia",
    category: "government",
    description: "Denúncias anônimas de crimes",
    isShortCode: true,
  },
  {
    number: "129",
    name: "Disque Aids",
    category: "government",
    description: "Informações sobre HIV/Aids",
    isShortCode: true,
  },
  {
    number: "136",
    name: "Disque Saúde",
    category: "government",
    description: "Informações sobre saúde pública",
    isShortCode: true,
  },
  
  // Serviços Públicos
  {
    number: "156",
    name: "Prefeitura (Múltiplas Cidades)",
    category: "public",
    description: "Central de atendimento de diversas prefeituras",
    isShortCode: true,
  },
  {
    number: "1746",
    name: "Prefeitura do Rio de Janeiro",
    category: "public",
    description: "Central 1746 - Atendimento da Prefeitura do RJ",
    isShortCode: true,
  },
  {
    number: "1551",
    name: "Prefeitura de Belo Horizonte",
    category: "public",
    description: "Central 1551 - BH Resolve",
    isShortCode: true,
  },
  {
    number: "156",
    name: "SP156 - Prefeitura de São Paulo",
    category: "public",
    description: "Central de atendimento da Prefeitura de SP",
    isShortCode: true,
  },
  {
    number: "147",
    name: "Ouvidoria Anatel",
    category: "utility",
    description: "Reclamações sobre serviços de telecomunicações",
    isShortCode: true,
  },
  
  // Bancos - Bradesco
  {
    number: "40026022",
    name: "Bradesco - SAC",
    category: "bank",
    description: "Atendimento ao cliente Bradesco",
  },
  {
    number: "08005700022",
    name: "Bradesco - 0800",
    category: "bank",
    description: "Atendimento gratuito Bradesco",
    isTollFree: true,
  },
  
  // Bancos - Itaú
  {
    number: "40044828",
    name: "Itaú - SAC",
    category: "bank",
    description: "Atendimento ao cliente Itaú",
  },
  {
    number: "08007280728",
    name: "Itaú - 0800",
    category: "bank",
    description: "Atendimento gratuito Itaú",
    isTollFree: true,
  },
  
  // Bancos - Banco do Brasil
  {
    number: "40040001",
    name: "Banco do Brasil - SAC",
    category: "bank",
    description: "Atendimento ao cliente BB",
  },
  {
    number: "08007290001",
    name: "Banco do Brasil - 0800",
    category: "bank",
    description: "Atendimento gratuito BB",
    isTollFree: true,
  },
  
  // Bancos - Caixa
  {
    number: "08007260101",
    name: "Caixa Econômica Federal",
    category: "bank",
    description: "Atendimento ao cliente Caixa",
    isTollFree: true,
  },
  
  // Bancos - Santander
  {
    number: "40043535",
    name: "Santander - SAC",
    category: "bank",
    description: "Atendimento ao cliente Santander",
  },
  {
    number: "08007627777",
    name: "Santander - 0800",
    category: "bank",
    description: "Atendimento gratuito Santander",
    isTollFree: true,
  },
  
  // Bancos - Nubank
  {
    number: "08005912117",
    name: "Nubank",
    category: "bank",
    description: "Atendimento ao cliente Nubank",
    isTollFree: true,
  },
  
  // Bancos - Inter
  {
    number: "30035454",
    name: "Banco Inter",
    category: "bank",
    description: "Atendimento ao cliente Inter",
  },
  
  // Bancos - PicPay
  {
    number: "08008873700",
    name: "PicPay",
    category: "bank",
    description: "Atendimento ao cliente PicPay",
    isTollFree: true,
  },
  
  // Utilidades
  {
    number: "0800",
    name: "0800 (Ligação Gratuita)",
    category: "utility",
    description: "Prefixo de ligações gratuitas",
    isTollFree: true,
    isShortCode: true,
  },
];

export function findUsefulNumber(number: string): UsefulNumber | null {
  const cleaned = number.replace(/\D/g, '');
  
  // Exact match
  const exact = usefulNumbers.find(n => n.number === cleaned);
  if (exact) return exact;
  
  // Prefix match for 0800
  if (cleaned.startsWith('0800')) {
    return usefulNumbers.find(n => n.number === '0800') || null;
  }
  
  // Check if it's a known short code
  if (cleaned.length <= 4) {
    return usefulNumbers.find(n => n.number === cleaned) || null;
  }
  
  return null;
}

export function isUsefulNumber(number: string): boolean {
  return findUsefulNumber(number) !== null;
}

export function getCategoryBadge(category: UsefulNumber['category']): {
  label: string;
  color: string;
} {
  switch (category) {
    case 'emergency':
      return { label: 'EMERGÊNCIA', color: 'red' };
    case 'government':
      return { label: 'GOVERNO', color: 'blue' };
    case 'public':
      return { label: 'SERVIÇO PÚBLICO', color: 'green' };
    case 'bank':
      return { label: 'BANCO', color: 'purple' };
    case 'utility':
      return { label: 'UTILIDADE', color: 'teal' };
  }
}
