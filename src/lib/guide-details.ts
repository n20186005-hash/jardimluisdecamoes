// Editorial additions per location. Source photos are stored locally under /public/guide-photos.
// Management notes distinguish a public authority from an operating entity where these differ.
// Content is provided per language (pt source + en/zh translations); Mirandese (mwl) reuses the
// Portuguese source on purpose — we do NOT fabricate Mirandese guide text.
import type { LocalizedText } from './expanded-guides';
type Detail = { management: LocalizedText; architecture: LocalizedText; photo?: string; source?: string; photoTip: LocalizedText; mapName?: string };
export const guideDetails: Record<string, Detail> = {
  'praca-rodrigues-lobo': { management: {
      pt: 'A Praça Rodrigues Lobo integra o espaço público do centro histórico de Leiria, acompanhado pelos serviços municipais. Cafés e esplanadas são explorados pelos respetivos estabelecimentos.',
      en: 'Praça Rodrigues Lobo is part of the public space of Leiria’s historic centre, overseen by the municipal services. Cafés and terraces are run by their respective businesses.',
      zh: 'Praça Rodrigues Lobo 属于莱里亚历史中心的公共空间，由市政部门管理。咖啡馆与露天座由各自商家经营。',
    }, architecture: {
      pt: 'A pavimentação em calçada portuguesa, as arcadas e as frentes edificadas criam uma sala de estar urbana. A praça leva o nome do poeta Francisco Rodrigues Lobo e relaciona-se com a expansão da cidade fora das muralhas.',
      en: 'The Portuguese cobblestone paving, the arcades and the built fronts create an urban living room. The square is named after the poet Francisco Rodrigues Lobo and relates to the city’s expansion beyond the walls.',
      zh: '葡式碎石铺装、拱廊与建筑立面共同营造出一处"城市客厅"。广场以诗人 Francisco Rodrigues Lobo 命名，并与城市向城墙之外的扩展相关。',
    }, photo: 'praca-rodrigues-lobo', source: 'Visit Leiria', photoTip: {
      pt: 'Fotografe de um dos cantos para incluir o desenho da calçada, arcadas e movimento das esplanadas.',
      en: 'Photograph from one of the corners to include the cobble pattern, the arcades and the movement of the terraces.',
      zh: '从一角取景，纳入碎石纹样、拱廊与露天座上的人流。',
    } },
  'castelo-de-leiria': { management: {
      pt: 'O Castelo de Leiria é um monumento patrimonial integrado na oferta cultural municipal; a Câmara Municipal de Leiria publica informações práticas de visita e bilhética.',
      en: 'The Castelo de Leiria is a heritage monument within the municipal cultural offer; Leiria City Council publishes practical visiting and ticketing information.',
      zh: '莱里亚城堡是市政文化供给中的遗产纪念碑；莱里亚市政厅发布实用的参观与售票信息。',
    }, architecture: {
      pt: 'A fortificação tem origem medieval e reúne muralhas, torres e espaços palacianos de diferentes épocas. A campanha de recuperação associada a Ernesto Korrodi marcou a leitura contemporânea do conjunto.',
      en: 'The fortification is of medieval origin and gathers ramparts, towers and palatial spaces from different periods. The restoration campaign associated with Ernesto Korrodi shaped the modern reading of the ensemble.',
      zh: '这座要塞源于中世纪，汇集了不同年代的城墙、塔楼与宫殿空间。与 Ernesto Korrodi 相关的修复工程塑造了今人对这一建筑群的解读。',
    }, photo: 'castelo-de-leiria', source: 'Touropia', photoTip: {
      pt: 'Procure um ponto exterior com a colina inteira no enquadramento e, na visita, use as aberturas da muralha para mostrar a cidade.',
      en: 'Look for an exterior spot with the whole hill in frame and, during the visit, use the rampart openings to reveal the city.',
      zh: '寻找能拍下整座山丘的外景点位；参观时利用城墙的开口来框出城市。',
    } },
  'se-de-leiria': { management: {
      pt: 'A Sé é um espaço religioso da Diocese de Leiria-Fátima. Visitas turísticas devem respeitar celebrações e orientações da comunidade responsável.',
      en: 'The Sé is a religious space of the Diocese of Leiria-Fátima. Tourist visits should respect celebrations and the guidance of the responsible community.',
      zh: '大教堂是莱里亚—法蒂玛教区的宗教场所。游客参观应尊重礼仪活动及管理团体的指引。',
    }, architecture: {
      pt: 'A construção da catedral começou no século XVI. A composição de fachada, o campanário separado e as transformações posteriores permitem observar várias fases da arquitetura religiosa.',
      en: 'Construction of the cathedral began in the 16th century. The façade composition, the separate bell tower and later changes let you observe several phases of religious architecture.',
      zh: '主教座堂始建于 16 世纪。立面构成、独立的钟楼与后世改动，让你得以观察宗教建筑的多个阶段。',
    }, photo: 'se-de-leiria', source: 'SAPO Viagens', photoTip: {
      pt: 'A praça frontal permite enquadrar a fachada sem distorcer demasiado as proporções; procure também a relação com o campanário.',
      en: 'The front square lets you frame the façade without too much distortion; also look for its relationship with the bell tower.',
      zh: '正面的广场便于取景立面而不致过度变形；也留意它与钟楼的关系。',
    } },
  'museu-de-leiria': { management: {
      pt: 'O Museu de Leiria é um equipamento cultural municipal. A Câmara Municipal divulga horários, exposições e condições de visita.',
      en: 'The Museu de Leiria is a municipal cultural facility. The City Council shares hours, exhibitions and visiting conditions.',
      zh: '莱里亚博物馆是市政文化设施。市政厅发布开放时间、展览与参观条件。',
    }, architecture: {
      pt: 'Instalado no antigo convento de Santo Agostinho, combina estruturas conventuais e salas museológicas modernas. Vale observar como os percursos expositivos se integram no edifício histórico.',
      en: 'Housed in the former Santo Agostinho convent, it combines conventual structures and modern museum rooms. It is worth noticing how the exhibition routes fit into the historic building.',
      zh: '博物馆设于原圣奥古斯丁修道院，结合了修道院结构与现代化展厅。值得留意展线如何融入历史建筑。',
    }, photo: 'museu-de-leiria', source: 'Instituto Politécnico de Leiria', photoTip: {
      pt: 'Fotografe a entrada e o contraste entre a fachada antiga, os volumes anexos e o pavimento da praça.',
      en: 'Photograph the entrance and the contrast between the old façade, the annex volumes and the square’s paving.',
      zh: '拍摄入口，以及古老立面、附属体量与广场铺装之间的对比。',
    } },
  'rio-lis': { management: {
      pt: 'As margens e passagens públicas integram a rede de espaços urbanos de Leiria; a gestão do domínio hídrico e a manutenção dos diferentes troços podem envolver entidades distintas.',
      en: 'The banks and public passages are part of Leiria’s network of urban spaces; management of the water domain and upkeep of different stretches may involve separate entities.',
      zh: '河岸与公共通道属于莱里亚的城市空间网络；水域管理与各段维护可能涉及不同机构。',
    }, architecture: {
      pt: 'As pontes pedonais e o traçado do Percurso Polis mostram como a cidade aproximou as zonas de passeio do rio. A paisagem resulta da sobreposição de infraestruturas contemporâneas e frentes históricas.',
      en: 'The footbridges and the layout of the Polis Route show how the city brought the walking areas close to the river. The landscape results from overlapping contemporary infrastructure and historic fronts.',
      zh: '人行桥与 Polis 步道的走向，展现了城市如何让步行区贴近河流。景观是当代基础设施与历史立面叠加的结果。',
    }, photo: 'rio-lis', source: 'Jornal de Leiria', photoTip: {
      pt: 'Experimente uma composição com ponte em primeiro plano e Castelo de Leiria ao fundo; a superfície da água pode produzir reflexos.',
      en: 'Try a composition with a bridge in the foreground and the Castelo de Leiria in the background; the water surface can produce reflections.',
      zh: '尝试以桥梁为前景、莱里亚城堡为背景的构图；水面可能形成倒影。',
    } },
  'mercado-de-santana': { management: {
      pt: 'O Mercado de Santana é um edifício de referência da cidade usado para atividades e eventos. A agenda municipal informa sobre a programação atual.',
      en: 'The Mercado de Santana is a landmark building used for activities and events. The municipal calendar informs about the current programme.',
      zh: '桑塔纳市场是城市的地标建筑，用于活动与展览。市政日程会公布当前安排。',
    }, architecture: {
      pt: 'O edifício de mercado do século XX apresenta fachadas claras, vãos regulares e uma cobertura ampla. A sua função passou do comércio quotidiano para usos culturais e comunitários.',
      en: 'The 20th-century market building has light façades, regular openings and a wide roof. Its function moved from daily commerce to cultural and community uses.',
      zh: '这座 20 世纪的市场建筑有浅色立面、规整的开口与宽大的屋顶。其功能从日常商业转向文化与社区用途。',
    }, photo: 'mercado-de-santana', source: 'Visitar Todo Portugal', photoTip: {
      pt: 'Faça uma fotografia frontal que inclua o letreiro MERCADO e a cobertura, e depois um detalhe dos vãos coloridos.',
      en: 'Take a frontal photo that includes the MERCADO sign and the roof, then a detail of the coloured openings.',
      zh: '拍一张正面照，纳入"MERCADO"招牌与屋顶，再拍一张彩色开口的细节。',
    } },
  'igreja-de-sao-pedro': { management: {
      pt: 'A Igreja de São Pedro integra o património religioso de Leiria. O acesso e as atividades no interior dependem da entidade que opera o espaço em cada período.',
      en: 'The Igreja de São Pedro is part of Leiria’s religious heritage. Interior access and activities depend on the entity operating the space at any time.',
      zh: '圣佩德罗教堂属于莱里亚的宗教遗产。内部通行与活动取决于各时期运营该空间的主体。',
    }, architecture: {
      pt: 'O portal românico em arcos concêntricos é um dos elementos mais expressivos do edifício, cujas origens remontam à Idade Média. Compare a cantaria do portal com a simplicidade das superfícies exteriores.',
      en: 'The Romanesque portal with concentric arches is one of the building’s most expressive elements, originating in the Middle Ages. Compare the portal’s stonework with the simplicity of the exterior surfaces.',
      zh: '带有同心拱的罗马式门廊是建筑最具表现力的元素之一，其起源可追溯到中世纪。请将门廊的石工与简洁的外立面作比较。',
    }, photo: 'igreja-de-sao-pedro', source: 'Visit Leiria', photoTip: {
      pt: 'Aproximar-se lateralmente do portal ajuda a captar a profundidade dos arcos de pedra; não bloqueie a entrada.',
      en: 'Approaching the portal from the side helps capture the depth of the stone arches; do not block the entrance.',
      zh: '从侧面靠近门廊有助于表现石拱的纵深；请勿挡住入口。',
    } },
  'miradouro-ernesto-korrodi': { management: {
      pt: 'O miradouro é um espaço de observação da cidade; a informação turística e a manutenção dos espaços públicos são acompanhadas pelo município.',
      en: 'The viewpoint is a city observation space; tourist information and upkeep of the public spaces are handled by the municipality.',
      zh: '观景台是城市的观测空间；旅游信息与公共空间维护由市政部门负责。',
    }, architecture: {
      pt: 'A topografia de Leiria faz do miradouro um contraponto às ruas baixas do Lis. Não é tanto um edifício quanto um ponto para ler coberturas, eixos urbanos e o relevo.',
      en: 'Leiria’s topography makes the viewpoint a counterpoint to the low streets of the Lis. It is less a building than a point from which to read rooftops, urban axes and relief.',
      zh: '莱里亚的地形让观景台与 Lis 河畔的低矮街道形成对照。它与其说是建筑，不如说是一个读取屋顶、城市轴线与地貌的观测点。',
    }, photo: 'miradouro-ernesto-korrodi', source: 'Visit Leiria', photoTip: {
      pt: 'Inclua uma linha de telhados e as colinas no fundo; ao fim do dia a luz tende a evidenciar texturas.',
      en: 'Include a line of rooftops and the hills in the background; late in the day the light tends to reveal textures.',
      zh: '将一排屋顶与远处山丘纳入画面；傍晚时分光线往往能凸显质感。',
    } },
  'igreja-da-misericordia': { management: {
      pt: 'A Igreja da Misericórdia acolhe atividades do Centro de Diálogo Intercultural de Leiria (CDIL); consulte a programação municipal para saber quando é possível entrar.',
      en: 'The Igreja da Misericórdia hosts activities of the Leiria Intercultural Dialogue Centre (CDIL); check the municipal programme to know when entry is possible.',
      zh: '慈善堂承办莱里亚跨文化对话中心（CDIL）的活动；请查询市政节目表，了解何时可以入内。',
    }, architecture: {
      pt: 'A igreja participa na memória do antigo bairro judaico de Leiria. A leitura do interior, quando aberto, evidencia a estratificação do espaço e as suas adaptações culturais.',
      en: 'The church takes part in the memory of Leiria’s former Jewish quarter. The interior reading, when open, reveals the stratification of the space and its cultural adaptations.',
      zh: '这座教堂参与了莱里亚昔日犹太区的记忆。内部（开放时）的细读，能显现空间的分层及其文化适应。',
    }, photo: 'igreja-da-misericordia', source: 'Leiriagenda / Município de Leiria', photoTip: {
      pt: 'Com acesso autorizado, fotografe a simetria do espaço central e os detalhes de pedra, sem flash durante atividades.',
      en: 'With authorised access, photograph the symmetry of the central space and the stone details, without flash during activities.',
      zh: '在获准进入时，拍摄中央空间的对称与石作细节，活动期间请勿使用闪光灯。',
    } },
  'casa-dos-pintores': { management: {
      pt: 'A Casa dos Pintores integra a programação patrimonial e cultural associada ao CDIL e ao município; os períodos de abertura dependem das atividades anunciadas.',
      en: 'The Casa dos Pintores is part of the heritage and cultural programme associated with the CDIL and the municipality; opening periods depend on the announced activities.',
      zh: 'Casa dos Pintores 属于与 CDIL 及市政相关的遗产与文化节目；开放时段取决于已公布的活动。',
    }, architecture: {
      pt: 'A construção histórica preserva a escala de uma casa urbana antiga. A varanda de madeira e a rua estreita recordam o contexto residencial e comercial do velho bairro.',
      en: 'The historic building preserves the scale of an old urban house. The wooden balcony and the narrow street recall the residential and commercial context of the old quarter.',
      zh: '这座历史建筑保留了一栋老城住宅的尺度。木质阳台与窄巷让人想起老城区的居住与商业背景。',
    }, photo: 'casa-dos-pintores', source: 'Jornal de Leiria', photoTip: {
      pt: 'Use a rua como linha de fuga para a varanda vermelha, mantendo a leitura da fachada inteira.',
      en: 'Use the street as a leading line to the red balcony, keeping the whole façade readable.',
      zh: '用街道作为引导线指向红色阳台，同时保持整面立面清晰可读。',
    } },
  'parque-do-aviao': { management: {
      pt: 'O Parque Municipal Tenente Coronel Jaime Filipe da Fonseca é um espaço verde municipal de Leiria; confirme no município a utilização dos equipamentos.',
      en: 'The municipal park Tenente Coronel Jaime Filipe da Fonseca is a green space of Leiria; confirm equipment use with the municipality.',
      zh: 'Tenente Coronel Jaime Filipe da Fonseca 市政公园是莱里亚的绿地；请向市政部门确认设施的使用情况。',
    }, architecture: {
      pt: 'Os caminhos arborizados, o corredor verde e a presença de estruturas recreativas definem um parque pensado para permanência e circulação. O nome popular remete para a aeronave exposta.',
      en: 'The tree-lined paths, the green corridor and the recreational structures define a park designed for staying and moving. The popular name refers to the aircraft on display.',
      zh: '林荫步道、绿廊与休闲设施，定义了一个以停留与通行为主的公园。俗称"飞机公园"源于园中展出的飞机。',
    }, photo: 'parque-do-aviao', source: 'Câmara Municipal de Leiria', photoTip: {
      pt: 'As árvores criam linhas de profundidade sobre o caminho; fotografe sem interferir com outros utilizadores.',
      en: 'The trees create depth lines over the path; photograph without interfering with other users.',
      zh: '树木在步道上方形成纵深线条；拍摄时请勿打扰其他使用者。',
    } },
  'jardim-de-santo-agostinho': { management: {
      pt: 'O jardim integra os espaços públicos de Leiria e fica junto de equipamentos culturais municipais. A manutenção do espaço aberto e a operação do museu são funções distintas.',
      en: 'The garden is part of Leiria’s public spaces and sits next to municipal cultural facilities. Upkeep of the open space and operation of the museum are distinct functions.',
      zh: '花园属于莱里亚的公共空间，紧邻市政文化设施。开放空间的维护与博物馆的运营是不同职能。',
    }, architecture: {
      pt: 'A importância paisagística vem sobretudo da relação visual com o antigo conjunto conventual. Observe os alinhamentos e os enquadramentos do património a partir do jardim.',
      en: 'Its landscape importance comes mainly from the visual relationship with the former conventual complex. Observe the alignments and the heritage framings from the garden.',
      zh: '其景观价值主要来自与原修道院建筑群的视觉关联。请从花园中观察其轴线对齐与对遗产的框景。',
    }, photo: 'jardim-de-santo-agostinho', source: 'Visit Leiria', photoTip: {
      pt: 'Enquadre o jardim com a fachada do antigo convento; as claraboias no relvado acrescentam interesse arquitetónico.',
      en: 'Frame the garden with the former convent façade; the skylights on the lawn add architectural interest.',
      zh: '将花园与原修道院立面同框；草坪上的天窗增添了建筑趣味。',
    } },
  'parque-verde-de-leiria': { management: {
      pt: 'O Parque Verde de Leiria foi apresentado e inaugurado pela Câmara Municipal de Leiria como espaço público de recreio.',
      en: 'The Parque Verde de Leiria was presented and opened by the Leiria City Council as a public recreation space.',
      zh: '莱里亚绿园由莱里亚市政厅作为公共休闲空间推出并开放。',
    }, architecture: {
      pt: 'O parque inaugurado em 2022 acrescenta percursos e passadiços em zonas arborizadas. O desenho privilegia a circulação pedonal e o contacto com a vegetação.',
      en: 'The park, opened in 2022, adds paths and walkways in wooded areas. The design favours pedestrian circulation and contact with vegetation.',
      zh: '这座 2022 年开放的公园，在林地中增加了步道与栈桥。设计偏向步行通行与亲近植被。',
    }, photo: 'parque-verde-de-leiria', source: 'Câmara Municipal de Leiria', photoTip: {
      pt: 'O passadiço curvo dá profundidade à fotografia; mantenha os limites do caminho visíveis para contextualizar o parque.',
      en: 'The curved walkway gives depth to the photo; keep the path edges visible to contextualise the park.',
      zh: '弯曲的栈桥为照片增添纵深；保留步道边缘可见，以交代公园的环境。',
    } },
  'fonte-das-tres-bicas': { management: {
      pt: 'A Fonte das Três Bicas é património integrado no espaço público de Leiria. Para conservação e avisos locais, consulte os serviços municipais.',
      en: 'The Fonte das Três Bicas is heritage within Leiria’s public space. For conservation and local notices, consult the municipal services.',
      zh: '三喷池喷泉是莱里亚公共空间中的遗产。关于保护与当地告示，请咨询市政部门。',
    }, architecture: {
      pt: 'A fonte apresenta três bicas esculpidas e um tanque de pedra. Recorda os antigos pontos de abastecimento antes da generalização da rede doméstica de água.',
      en: 'The fountain has three carved spouts and a stone basin. It recalls the old supply points before the domestic water network became widespread.',
      zh: '喷泉有三处雕琢的出水口与一个石质水池。它让人想起自来水管网普及之前的旧时供水点。',
    }, photo: 'fonte-das-tres-bicas', source: 'Jornal de Leiria', photoTip: {
      pt: 'Fotografe de frente para evidenciar as três saídas e a geometria do tanque; não beba a água sem indicação de potabilidade.',
      en: 'Photograph from the front to show the three spouts and the basin geometry; do not drink the water without a potability indication.',
      zh: '正面拍摄以凸显三处出水口与水池的几何形态；在未有可饮用标识前请勿饮水。',
    } },
  'igreja-do-espirito-santo': { management: {
      pt: 'A Igreja do Espírito Santo é património religioso. A entidade de culto responsável define as condições de acesso interior; confirme-as presencialmente.',
      en: 'The Igreja do Espírito Santo is religious heritage. The responsible worship entity sets the interior access conditions; confirm them in person.',
      zh: '圣灵教堂是宗教遗产。负责礼拜的主体制定内部通行条件；请当面确认。',
    }, architecture: {
      pt: 'A igreja é uma referência de escala mais contida no tecido urbano, com uma organização religiosa tradicional. A fachada e os interiores, quando acessíveis, oferecem uma comparação útil com a monumentalidade da Sé.',
      en: 'The church is a more contained-scale reference in the urban fabric, with a traditional religious organisation. Its façade and interiors, when accessible, offer a useful comparison with the monumentality of the Sé.',
      zh: '这座教堂在城市肌理中属于尺度更内敛的地标，带有传统的宗教组织方式。其立面与内部（可进入时）可与大教堂的宏伟形成有益对照。',
    }, photo: 'igreja-do-espirito-santo', source: 'Visit Leiria', photoTip: {
      pt: 'Registe a fachada em contexto de rua, respeitando cerimónias e entradas.',
      en: 'Record the façade in a street context, respecting ceremonies and entrances.',
      zh: '在街道环境中记录立面，尊重仪式活动与入口。',
    } },
};

export const planDestinations: Record<string, string> = {
  'jardim-historia-1940': 'Jardim Luís de Camões', 'passeio-centro-historico': 'Castelo de Leiria',
  'leiria-com-criancas': 'Praça Rodrigues Lobo', 'leiria-num-dia-sem-carro': 'Castelo de Leiria',
  'roteiro-fotografico-leiria': 'Miradouro Ernesto Korrodi', 'leiria-dia-de-chuva': 'Museu de Leiria',
  'jardim-melhor-hora': 'Jardim Luís de Camões', 'jardim-acessibilidade': 'Praça Rodrigues Lobo',
  'estacionamento-jardim': 'Jardim Luís de Camões', 'transportes-publicos-leiria': 'Jardim Luís de Camões',
  'jardim-praca-rodrigues-lobo': 'Praça Rodrigues Lobo', 'jardim-castelo-a-pe': 'Castelo de Leiria',
  'percurso-polis-rio-lis': 'Rio Lis', 'leiria-arquitetura': 'Castelo de Leiria',
  'leiria-passeio-curto': 'Praça Rodrigues Lobo', 'leiria-gastronomia-centro': 'Praça Rodrigues Lobo',
  'leiria-fim-de-semana': 'Parque Verde de Leiria',
};

export function guideMap(slug: string, original: string, isPlace: boolean) {
  if (isPlace) return original;
  const destination = planDestinations[slug] || 'Jardim Luís de Camões';
  if (destination === 'Jardim Luís de Camões') return original;
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Jardim Luís de Camões, Leiria, Portugal')}&destination=${encodeURIComponent(`${destination}, Leiria, Portugal`)}&travelmode=walking`;
}
