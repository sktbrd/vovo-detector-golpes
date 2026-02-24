// Brazilian phone number data (DDDs, carriers, VoIP patterns)

export interface DDDInfo {
  state: string;
  city: string;
  region: string;
}

export const validDDDs: Record<string, DDDInfo> = {
  // Região Sudeste
  "11": { state: "SP", city: "São Paulo", region: "Sudeste" },
  "12": { state: "SP", city: "São José dos Campos", region: "Sudeste" },
  "13": { state: "SP", city: "Santos", region: "Sudeste" },
  "14": { state: "SP", city: "Bauru", region: "Sudeste" },
  "15": { state: "SP", city: "Sorocaba", region: "Sudeste" },
  "16": { state: "SP", city: "Ribeirão Preto", region: "Sudeste" },
  "17": { state: "SP", city: "São José do Rio Preto", region: "Sudeste" },
  "18": { state: "SP", city: "Presidente Prudente", region: "Sudeste" },
  "19": { state: "SP", city: "Campinas", region: "Sudeste" },
  "21": { state: "RJ", city: "Rio de Janeiro", region: "Sudeste" },
  "22": { state: "RJ", city: "Campos dos Goytacazes", region: "Sudeste" },
  "24": { state: "RJ", city: "Volta Redonda", region: "Sudeste" },
  "27": { state: "ES", city: "Vitória", region: "Sudeste" },
  "28": { state: "ES", city: "Cachoeiro de Itapemirim", region: "Sudeste" },
  "31": { state: "MG", city: "Belo Horizonte", region: "Sudeste" },
  "32": { state: "MG", city: "Juiz de Fora", region: "Sudeste" },
  "33": { state: "MG", city: "Governador Valadares", region: "Sudeste" },
  "34": { state: "MG", city: "Uberlândia", region: "Sudeste" },
  "35": { state: "MG", city: "Poços de Caldas", region: "Sudeste" },
  "37": { state: "MG", city: "Divinópolis", region: "Sudeste" },
  "38": { state: "MG", city: "Montes Claros", region: "Sudeste" },
  
  // Região Sul
  "41": { state: "PR", city: "Curitiba", region: "Sul" },
  "42": { state: "PR", city: "Ponta Grossa", region: "Sul" },
  "43": { state: "PR", city: "Londrina", region: "Sul" },
  "44": { state: "PR", city: "Maringá", region: "Sul" },
  "45": { state: "PR", city: "Foz do Iguaçu", region: "Sul" },
  "46": { state: "PR", city: "Francisco Beltrão", region: "Sul" },
  "47": { state: "SC", city: "Joinville", region: "Sul" },
  "48": { state: "SC", city: "Florianópolis", region: "Sul" },
  "49": { state: "SC", city: "Chapecó", region: "Sul" },
  "51": { state: "RS", city: "Porto Alegre", region: "Sul" },
  "53": { state: "RS", city: "Pelotas", region: "Sul" },
  "54": { state: "RS", city: "Caxias do Sul", region: "Sul" },
  "55": { state: "RS", city: "Santa Maria", region: "Sul" },
  
  // Região Nordeste
  "71": { state: "BA", city: "Salvador", region: "Nordeste" },
  "73": { state: "BA", city: "Ilhéus", region: "Nordeste" },
  "74": { state: "BA", city: "Juazeiro", region: "Nordeste" },
  "75": { state: "BA", city: "Feira de Santana", region: "Nordeste" },
  "77": { state: "BA", city: "Vitória da Conquista", region: "Nordeste" },
  "79": { state: "SE", city: "Aracaju", region: "Nordeste" },
  "81": { state: "PE", city: "Recife", region: "Nordeste" },
  "82": { state: "AL", city: "Maceió", region: "Nordeste" },
  "83": { state: "PB", city: "João Pessoa", region: "Nordeste" },
  "84": { state: "RN", city: "Natal", region: "Nordeste" },
  "85": { state: "CE", city: "Fortaleza", region: "Nordeste" },
  "86": { state: "PI", city: "Teresina", region: "Nordeste" },
  "87": { state: "PE", city: "Petrolina", region: "Nordeste" },
  "88": { state: "CE", city: "Juazeiro do Norte", region: "Nordeste" },
  "89": { state: "PI", city: "Picos", region: "Nordeste" },
  "98": { state: "MA", city: "São Luís", region: "Nordeste" },
  "99": { state: "MA", city: "Imperatriz", region: "Nordeste" },
  
  // Região Norte
  "61": { state: "DF/GO", city: "Brasília/Goiânia", region: "Centro-Oeste" },
  "62": { state: "GO", city: "Goiânia", region: "Centro-Oeste" },
  "63": { state: "TO", city: "Palmas", region: "Norte" },
  "64": { state: "GO", city: "Rio Verde", region: "Centro-Oeste" },
  "65": { state: "MT", city: "Cuiabá", region: "Centro-Oeste" },
  "66": { state: "MT", city: "Rondonópolis", region: "Centro-Oeste" },
  "67": { state: "MS", city: "Campo Grande", region: "Centro-Oeste" },
  "68": { state: "AC", city: "Rio Branco", region: "Norte" },
  "69": { state: "RO", city: "Porto Velho", region: "Norte" },
  "91": { state: "PA", city: "Belém", region: "Norte" },
  "92": { state: "AM", city: "Manaus", region: "Norte" },
  "93": { state: "PA", city: "Santarém", region: "Norte" },
  "94": { state: "PA", city: "Marabá", region: "Norte" },
  "95": { state: "RR", city: "Boa Vista", region: "Norte" },
  "96": { state: "AP", city: "Macapá", region: "Norte" },
  "97": { state: "AM", city: "Tefé", region: "Norte" },
};

// Carrier prefixes (mobile only, 9XXXX-XXXX)
export const carrierPrefixes: Record<string, string[]> = {
  "Vivo": ["997", "996", "995", "994", "993", "992", "973", "974"],
  "Claro": ["991", "992", "993", "994", "995", "996", "997", "998", "999", "975", "976", "977"],
  "TIM": ["998", "999", "989", "988", "987", "986", "981", "982", "983"],
  "Oi": ["988", "989", "987", "986", "984", "985"],
  "Algar": ["991", "992"],
  "Nextel": ["987", "988"],
};

// VoIP and special number patterns
export const specialPatterns = {
  voip: [
    /^0800/, // Toll-free
    /^4000/, // Nextel Direct Connect
    /^4003/, // Nextel
    /^4020/, // Nextel
    /^300/,  // Call centers
  ],
  
  government: [
    /^190/, // Polícia
    /^193/, // Bombeiros
    /^192/, // SAMU
    /^197/, // Polícia Civil
    /^181/, // Disque-Denúncia
  ],
  
  utility: [
    /^10[0-9]{2}/, // Serviços de operadoras
  ],
};

export function isDDDValid(ddd: string): boolean {
  return ddd in validDDDs;
}

export function isVoIP(number: string): boolean {
  const cleaned = number.replace(/\D/g, '');
  return specialPatterns.voip.some(pattern => pattern.test(cleaned));
}

export function isGovernment(number: string): boolean {
  const cleaned = number.replace(/\D/g, '');
  return specialPatterns.government.some(pattern => pattern.test(cleaned));
}

export function getCarrier(number: string): string | null {
  const cleaned = number.replace(/\D/g, '');
  
  // Mobile numbers: (XX) 9XXXX-XXXX (11 digits total)
  if (cleaned.length === 11 && cleaned[2] === '9') {
    const prefix = cleaned.substring(2, 5); // Get 9XX
    
    for (const [carrier, prefixes] of Object.entries(carrierPrefixes)) {
      if (prefixes.includes(prefix)) {
        return carrier;
      }
    }
  }
  
  return null;
}

export function getLineType(number: string): string {
  const cleaned = number.replace(/\D/g, '');
  
  if (isGovernment(number)) return "Serviço de Emergência";
  if (isVoIP(number)) return "VoIP/0800";
  
  if (cleaned.length === 11 && cleaned[2] === '9') {
    return "Móvel";
  } else if (cleaned.length === 10) {
    return "Fixo";
  }
  
  return "Desconhecido";
}
