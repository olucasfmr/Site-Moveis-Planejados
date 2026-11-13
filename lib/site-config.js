export const business = {
  name: "Jr Móveis Planejados",
  shortName: "JR",
  instagram: "https://www.instagram.com/jr1_moveisplanejados?mdxt=d2M2NGppanVzcHQ0",
  whatsapp: "", // Informe somente os números com código do país e DDD, por exemplo: 5511999999999.
  phone: "(00) 00000-0000",
  email: "seuemail@exemplo.com",
  address: "Seu endereço, cidade — UF",
  hours: "Segunda a sexta, das 8h às 18h",
  mapEmbedUrl: "https://maps.google.com/maps?q=Brasil&t=&z=5&ie=UTF8&iwloc=&output=embed"
};

const image = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const photos = {
  hero: image("photo-1600607687939-ce8a6c25118c", 2200),
  heroMarquee: [
    { image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120544_94be5de4-0f4f-494c-bb78-c532290040a6.png&w=1920&q=85", alt: "Ambiente residencial com móveis contemporâneos sob medida" },
    { image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120601_5c6e4705-b992-4227-9dff-9b000351c283.png&w=1920&q=85", alt: "Detalhes de marcenaria em um interior residencial" },
    { image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120619_7bc65416-a3d7-4e8c-9929-743f233378fe.png&w=1920&q=85", alt: "Móveis planejados integrados à arquitetura da casa" },
    { image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120627_b40a97b0-c5fa-408c-a77e-dc8fa44f8584.png&w=1920&q=85", alt: "Projeto de interiores com acabamentos acolhedores" },
    { image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120635_515cde41-2dc6-48ce-a236-088a5bc74ca8.png&w=1920&q=85", alt: "Ambiente planejado com linhas contemporâneas" },
    { image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120645_5a1170c6-145b-477b-abd2-f8620acccd8d.png&w=1920&q=85", alt: "Marcenaria sob medida em uma residência" }
  ],
  workshop: image("photo-1620626011761-996317b8d101"),
  rooms: [
    { title: "Cozinhas", text: "O coração da casa merece beleza, praticidade e espaço para viver bons momentos.", image: image("photo-1600566753086-00f18fb6b3ea"), alt: "Cozinha planejada em madeira e tons claros" },
    { title: "Quartos", text: "Um refúgio pensado para acolher a sua rotina e guardar tudo com leveza.", image: image("photo-1616486338812-3dadae4b4ace"), alt: "Quarto acolhedor com móveis sob medida" },
    { title: "Salas", text: "Integração, conforto e personalidade em cada detalhe do ambiente.", image: image("photo-1600210492486-724fe5c67fb0"), alt: "Sala contemporânea com marcenaria planejada" },
    { title: "Closets", text: "Organização inteligente, acabamentos elegantes e tudo no seu devido lugar.", image: image("photo-1618221195710-dd6b41faaea6"), alt: "Closet elegante com armários sob medida" },
    { title: "Áreas gourmet", text: "O cenário perfeito para receber, cozinhar e celebrar sem pressa.", image: image("photo-1600607687920-4e2a09cf159d"), alt: "Área gourmet integrada e planejada" }
  ],
  objects: [
    { title: "Estantes & nichos", text: "Peças que organizam a casa e revelam o que faz parte da sua história.", image: image("photo-1594620302200-9a762244a156"), alt: "Estante de madeira sob medida" },
    { title: "Painéis de TV", text: "Tecnologia integrada a um desenho limpo, funcional e cheio de presença.", image: image("photo-1600210491892-03d54c0aaf87"), alt: "Painel de televisão em madeira" },
    { title: "Mesas", text: "Feitas para aproximar pessoas, em medidas que cabem perfeitamente no seu espaço.", image: image("photo-1600607687939-ce8a6c25118c"), alt: "Mesa de jantar em ambiente sofisticado" },
    { title: "Bancadas", text: "Acabamento cuidadoso e soluções duráveis para trabalhar, cozinhar e viver.", image: image("photo-1600566753190-17f0baa2a6c3"), alt: "Bancada planejada com acabamento em madeira" },
    { title: "Peças especiais", text: "Uma ideia diferente? Criamos soluções únicas, com a sua identidade.", image: image("photo-1600607687920-4e2a09cf159d"), alt: "Detalhe de móveis feitos sob medida" }
  ],
  projects: [
    { title: "Cozinha Essência", category: "Cozinhas", image: image("photo-1600566753086-00f18fb6b3ea"), alt: "Cozinha planejada com armários amadeirados" },
    { title: "Suíte Aconchego", category: "Quartos", image: image("photo-1616486338812-3dadae4b4ace"), alt: "Suíte com cabeceira e armários planejados" },
    { title: "Estar Horizonte", category: "Salas", image: image("photo-1600210492486-724fe5c67fb0"), alt: "Sala com painel e marcenaria contemporânea" },
    { title: "Closet Aurora", category: "Closets", image: image("photo-1618221195710-dd6b41faaea6"), alt: "Closet feito sob medida com iluminação suave" },
    { title: "Cozinha Raízes", category: "Cozinhas", image: image("photo-1600607687920-4e2a09cf159d"), alt: "Cozinha integrada com detalhes em madeira" },
    { title: "Sala Refúgio", category: "Salas", image: image("photo-1600210491892-03d54c0aaf87"), alt: "Sala aconchegante com painel de madeira" }
  ]
};
