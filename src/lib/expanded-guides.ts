// Editorial routes: each entry has a distinct visitor question and map destination.
// Avoid publishing unsupported ticket prices or opening-hour promises.
// Content is provided per language (pt source + en/zh translations).
// Mirandese (mwl) reuses the Portuguese source on purpose: we do NOT fabricate
// Mirandese guide text, so mwl visitors are linked to the Portuguese original.
export type LocalizedText = { pt: string; en: string; zh: string };
export type Guide = {
  slug: string; title: string; kind: 'place' | 'plan';
  focus: LocalizedText; context: LocalizedText; observe: LocalizedText; visit: LocalizedText; route: LocalizedText;
  map: string;
};

const place = (slug: string, title: string, focus: LocalizedText, context: LocalizedText, observe: LocalizedText, visit: LocalizedText, route: LocalizedText): Guide => ({
  slug, title, kind: 'place', focus, context, observe, visit, route,
  map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${title}, Leiria, Portugal`)}`,
});
const plan = (slug: string, title: string, focus: LocalizedText, context: LocalizedText, observe: LocalizedText, visit: LocalizedText, route: LocalizedText): Guide => ({
  slug, title, kind: 'plan', focus, context, observe, visit, route,
  map: 'https://www.google.com/maps/search/?api=1&query=Jardim+Lu%C3%ADs+de+Cam%C3%B5es%2C+Leiria%2C+Portugal',
});

export const expandedGuides: Guide[] = [
  place('praca-rodrigues-lobo', 'Praça Rodrigues Lobo',
    {
      pt: 'A praça histórica mais conveniente para combinar com o jardim.',
      en: 'The most convenient historic square to combine with the garden.',
      zh: '与花园最方便衔接的历史广场。',
    },
    {
      pt: 'A praça pertence ao núcleo pedonal de Leiria e funciona como espaço de encontro rodeado por fachadas e esplanadas. A malha urbana ao redor revela a expansão da cidade para fora da zona do castelo.',
      en: 'The square belongs to Leiria’s pedestrian core and works as a meeting place surrounded by façades and terraces. The surrounding urban fabric shows how the city grew beyond the castle area.',
      zh: '广场属于莱里亚的步行核心区，是被建筑立面与露天座环绕的聚会空间。周围的城市肌理展现出城市向城堡区之外扩展的历程。',
    },
    {
      pt: 'Repare na sequência de arcadas, nas fachadas e na ligação das ruas estreitas à praça. Compare a escala aberta da praça com os caminhos arborizados do jardim.',
      en: 'Notice the sequence of arcades, the façades and how the narrow streets connect to the square. Compare the open scale of the square with the tree-lined paths of the garden.',
      zh: '留意连续的拱廊、建筑立面，以及窄巷与广场的连接方式。把广场开敞的尺度与花园里林荫小径作对比。',
    },
    {
      pt: 'Visite a pé e faça uma pausa nas esplanadas; preços e horários dependem de cada estabelecimento.',
      en: 'Explore on foot and take a break at the terraces; prices and hours depend on each venue.',
      zh: '步行游览，并在露天座小憩；价格与营业时间视各店铺而定。',
    },
    {
      pt: 'Do Jardim Luís de Camões siga pela passagem do Banco de Portugal para a zona pedonal e alcance a praça.',
      en: 'From Jardim Luís de Camões, follow the Banco de Portugal passage to the pedestrian area and reach the square.',
      zh: '从 Jardim Luís de Camões 沿葡萄牙银行通道步行至步行区，即可抵达广场。',
    },
  ),
  place('castelo-de-leiria', 'Castelo de Leiria',
    {
      pt: 'Fortificação no alto da colina e panorama sobre Leiria.',
      en: 'Hilltop fortification with a panorama over Leiria.',
      zh: '矗立于山丘之上的要塞，可俯瞰莱里亚全景。',
    },
    {
      pt: 'O castelo domina a paisagem urbana e reúne vestígios medievais e intervenções posteriores. A subida ajuda a perceber a relação entre o antigo núcleo defensivo e a cidade junto ao Lis.',
      en: 'The castle dominates the townscape and gathers medieval remains and later interventions. The climb helps you understand the relationship between the old defensive core and the city by the Lis.',
      zh: '城堡主导着城市景观，汇集了中世纪遗迹与后世的修缮。登坡能帮助理解古老防御核心与 Lis 河畔城市之间的关系。',
    },
    {
      pt: 'Observe as muralhas, a implantação sobre a elevação e as perspetivas abertas sobre os telhados e o vale.',
      en: 'Observe the ramparts, the siting on the hill and the open views over the rooftops and the valley.',
      zh: '观察城墙、建于高处的选址，以及俯瞰屋顶与河谷的开阔视野。',
    },
    {
      pt: 'Reserve tempo adicional para a subida; confirme bilhetes, acessibilidade e eventuais encerramentos nos canais municipais antes de partir.',
      en: 'Allow extra time for the climb; check tickets, accessibility and any closures via the municipal channels before you set off.',
      zh: '为登坡预留额外时间；出发前请通过市政渠道确认门票、无障碍设施及可能的闭馆情况。',
    },
    {
      pt: 'Atravesse o centro histórico a partir do jardim e continue pela subida sinalizada em direção ao castelo.',
      en: 'Cross the historic centre from the garden and continue up the signposted climb towards the castle.',
      zh: '从花园穿行历史中心，沿设有指示牌的坡道继续上行前往城堡。',
    },
  ),
  place('se-de-leiria', 'Sé de Leiria',
    {
      pt: 'Arquitetura religiosa no centro histórico.',
      en: 'Religious architecture in the historic centre.',
      zh: '历史中心内的宗教建筑。',
    },
    {
      pt: 'A catedral marca uma das etapas principais do percurso urbano de Leiria e ajuda a compreender a importância religiosa e cívica do centro antigo.',
      en: 'The cathedral marks one of the main stages of Leiria’s urban route and helps you understand the religious and civic importance of the old centre.',
      zh: '大教堂是莱里亚城市步道的主要节点之一，有助于理解老城中心在宗教与 civic 层面的重要性。',
    },
    {
      pt: 'Compare a fachada com as proporções interiores, quando houver acesso, e observe a relação do edifício com a praça em redor.',
      en: 'Compare the façade with the interior proportions, when access is available, and observe how the building relates to the surrounding square.',
      zh: '在可进入时，将立面与内部比例作比较，并观察建筑与周边广场的关系。',
    },
    {
      pt: 'Durante celebrações religiosas evite interromper a atividade; confirme horários de visita no local.',
      en: 'During religious celebrations avoid interrupting the service; confirm visiting hours on site.',
      zh: '宗教庆典期间请勿打扰活动；请于现场确认参观时间。',
    },
    {
      pt: 'Saia do jardim pelo centro pedonal, passe pela Praça Rodrigues Lobo e prossiga até à Sé.',
      en: 'Leave the garden through the pedestrian centre, pass Praça Rodrigues Lobo and continue to the Sé.',
      zh: '从花园经步行中心离开，经过 Praça Rodrigues Lobo，继续前往大教堂。',
    },
  ),
  place('museu-de-leiria', 'Museu de Leiria',
    {
      pt: 'Coleções para compreender a história e a identidade local.',
      en: 'Collections to understand local history and identity.',
      zh: '通过馆藏了解当地历史与身份认同。',
    },
    {
      pt: 'O museu ocupa o conjunto associado ao antigo convento de Santo Agostinho, ligando património arquitetónico e narrativa histórica da região.',
      en: 'The museum occupies the complex of the former Santo Agostinho convent, linking architectural heritage and the region’s historical narrative.',
      zh: '博物馆位于原圣奥古斯丁修道院建筑群内，将建筑遗产与本地区的历史叙事相连。',
    },
    {
      pt: 'Observe a adaptação dos espaços do convento a salas expositivas e procure peças que contextualizem a cidade vista no passeio.',
      en: 'Notice how the convent spaces were adapted into exhibition rooms and look for pieces that contextualise the city you saw on the walk.',
      zh: '留意修道院空间如何改造成展厅，并寻找能将步行中所见城市放入语境的展品。',
    },
    {
      pt: 'É uma boa alternativa em dias de chuva; verifique exposições, preço e horário no serviço municipal.',
      en: 'It is a good rainy-day alternative; check exhibitions, price and hours with the municipal service.',
      zh: '它是雨天的好去处；请向市政部门查询展览、票价与开放时间。',
    },
    {
      pt: 'Parta do jardim, acompanhe a zona central e siga em direção à Rua Tenente Valadim.',
      en: 'Start from the garden, follow the central area and head towards Rua Tenente Valadim.',
      zh: '从花园出发，沿中心区前行，朝 Rua Tenente Valadim 方向走。',
    },
  ),
  place('rio-lis', 'Rio Lis',
    {
      pt: 'O curso de água que organiza a paisagem do centro.',
      en: 'The watercourse that organises the centre’s landscape.',
      zh: '串联起城市中心景观的水道。',
    },
    {
      pt: 'As margens do Lis conectam o jardim a caminhos, pontes e espaços públicos. O percurso Polis requalificou troços da frente ribeirinha para circulação e lazer.',
      en: 'The banks of the Lis connect the garden to paths, bridges and public spaces. The Polis route renewed stretches of the riverside for walking and leisure.',
      zh: 'Lis 河的河岸把花园与步道、桥梁和公共空间连在一起。Polis 步道翻新了滨河段的步行与休闲功能。',
    },
    {
      pt: 'Observe as pontes pedonais, as vistas de ambas as margens e a relação entre água, árvores e frentes construídas.',
      en: 'Observe the footbridges, the views from both banks and the relationship between water, trees and built fronts.',
      zh: '观察人行桥、两岸的景色，以及水、树木与建筑立面之间的关系。',
    },
    {
      pt: 'Prefira calçado confortável; depois de chuva verifique o piso e evite zonas inundadas ou vedadas.',
      en: 'Wear comfortable shoes; after rain check the surface and avoid flooded or fenced-off areas.',
      zh: '建议穿舒适的鞋；雨后请留意路面，避开积水或封闭区域。',
    },
    {
      pt: 'Comece no Jardim Luís de Camões e siga os percursos públicos junto ao rio, regressando pela margem oposta quando possível.',
      en: 'Start at Jardim Luís de Camões and follow the public paths along the river, returning along the opposite bank when possible.',
      zh: '从 Jardim Luís de Camões 出发，沿河岸的公共步道前行，条件允许时从对岸返回。',
    },
  ),
  place('mercado-de-santana', 'Mercado de Santana',
    {
      pt: 'Uma paragem urbana ligada à história comercial da cidade.',
      en: 'An urban stop tied to the city’s commercial history.',
      zh: '一处与城市商业历史相关的城市站点。',
    },
    {
      pt: 'O edifício histórico do mercado é uma referência do quotidiano e da arquitetura de Leiria, mesmo quando o seu uso varia com a programação cultural.',
      en: 'The historic market building is a reference point of everyday life and of Leiria’s architecture, even when its use changes with the cultural programme.',
      zh: '这座历史市场建筑是莱里亚日常生活与建筑的地标，即便其用途随文化节目而变化。',
    },
    {
      pt: 'Observe a volumetria, os detalhes de fachada e como o espaço se articula com as ruas comerciais.',
      en: 'Observe the massing, the façade details and how the space connects with the commercial streets.',
      zh: '观察建筑体量、立面细节，以及空间如何与商业街衔接。',
    },
    {
      pt: 'Consulte a agenda local para eventos; não presuma que funciona diariamente como mercado alimentar.',
      en: 'Check the local calendar for events; do not assume it operates daily as a food market.',
      zh: '请查询当地活动日程；不要想当然地认为它每天都作为食品市场营业。',
    },
    {
      pt: 'Do jardim atravesse a área pedonal central em direção ao Largo de Santana.',
      en: 'From the garden cross the central pedestrian area towards Largo de Santana.',
      zh: '从花园穿过中央步行区，朝 Largo de Santana 方向走。',
    },
  ),
  place('igreja-de-sao-pedro', 'Igreja de São Pedro',
    {
      pt: 'Uma escala íntima do património religioso medieval.',
      en: 'An intimate take on medieval religious heritage.',
      zh: '中世纪宗教遗产中一处亲切的小型范例。',
    },
    {
      pt: 'Esta igreja integra o conjunto de pontos de interesse históricos da encosta do castelo e permite comparar o património religioso mais antigo com a Sé.',
      en: 'This church is part of the historic points of interest on the castle slope and lets you compare older religious heritage with the Sé.',
      zh: '这座教堂属于城堡坡地上的历史景点群，可让你将更古老的宗教遗产与大教堂作比较。',
    },
    {
      pt: 'Atente às proporções da construção, aos materiais e à implantação no tecido urbano inclinado.',
      en: 'Pay attention to the building’s proportions, materials and placement in the sloping urban fabric.',
      zh: '留意建筑的比例、材料，以及它在倾斜城市肌理中的坐落方式。',
    },
    {
      pt: 'O acesso ao interior pode ser limitado; a observação exterior já acrescenta valor à caminhada.',
      en: 'Interior access may be limited; exterior observation already adds value to the walk.',
      zh: '内部可能限制进入；仅外部观察已为步行增添价值。',
    },
    {
      pt: 'Combine-a com o trajeto entre a Sé e o Castelo de Leiria.',
      en: 'Combine it with the route between the Sé and the Castelo de Leiria.',
      zh: '可将其与"大教堂—莱里亚城堡"之间的路线结合。',
    },
  ),
  place('miradouro-ernesto-korrodi', 'Miradouro Ernesto Korrodi',
    {
      pt: 'Perspetiva elevada sobre a malha urbana.',
      en: 'An elevated perspective over the urban grid.',
      zh: '俯瞰城市肌理的高处视角。',
    },
    {
      pt: 'O miradouro da Rua Ernesto Korrodi oferece uma leitura diferente da cidade moldada pelo rio e pela colina do castelo.',
      en: 'The viewpoint on Rua Ernesto Korrodi offers a different reading of the city shaped by the river and the castle hill.',
      zh: 'Rua Ernesto Korrodi 观景台提供了一种不同的视角，去看由河流与城堡山塑造的城市。',
    },
    {
      pt: 'Compare a geometria das ruas com as zonas verdes e fotografe as camadas de fachadas sem bloquear a passagem.',
      en: 'Compare the geometry of the streets with the green areas and photograph the layers of façades without blocking the way.',
      zh: '将街道的几何形态与绿地作比较，并拍摄层层立面，注意不要挡路。',
    },
    {
      pt: 'A luz lateral de manhã ou ao fim do dia pode ajudar nas fotografias; adapte o plano ao estado do tempo.',
      en: 'Side light in the morning or late afternoon can help your photos; adapt your plan to the weather.',
      zh: '清晨或傍晚的侧向光线有助于拍照；请根据天气调整计划。',
    },
    {
      pt: 'A partir do jardim siga pelo centro e suba em direção à Rua Ernesto Korrodi.',
      en: 'From the garden follow the centre and climb towards Rua Ernesto Korrodi.',
      zh: '从花园沿中心区前行，朝 Rua Ernesto Korrodi 上坡。',
    },
  ),
  place('igreja-da-misericordia', 'Igreja da Misericórdia de Leiria',
    {
      pt: 'Património e diálogo intercultural no centro antigo.',
      en: 'Heritage and intercultural dialogue in the old centre.',
      zh: '老城中心的文化遗产与跨文化对话。',
    },
    {
      pt: 'O percurso urbano municipal associa este lugar ao Centro de Diálogo Intercultural de Leiria, numa zona marcada por sucessivas comunidades e tradições.',
      en: 'The municipal urban route links this place to the Leiria Intercultural Dialogue Centre, in an area marked by successive communities and traditions.',
      zh: '市政城市步道将此地与莱里亚跨文化对话中心相连，所在区域留下了历代社群与传统的印记。',
    },
    {
      pt: 'Observe o enquadramento da igreja e os elementos interpretativos disponíveis para compreender as camadas históricas do local.',
      en: 'Observe the setting of the church and the interpretive elements available to understand the historical layers of the place.',
      zh: '观察教堂所处环境，以及可获取的诠释元素，以理解此地层层叠叠的历史。',
    },
    {
      pt: 'Consulte a programação e o regime de visitas antes de contar com acesso interior.',
      en: 'Check the programme and visiting arrangements before counting on interior access.',
      zh: '在指望进入内部前，请先查询活动安排与参观规定。',
    },
    {
      pt: 'Inclua esta paragem depois da Praça Rodrigues Lobo, nas ruas do centro histórico.',
      en: 'Include this stop after Praça Rodrigues Lobo, on the streets of the historic centre.',
      zh: '可在 Praça Rodrigues Lobo 之后、于历史中心的街巷中加入这一站。',
    },
  ),
  place('casa-dos-pintores', 'Casa dos Pintores',
    {
      pt: 'Uma paragem para ler as fachadas históricas de Leiria.',
      en: 'A stop to read Leiria’s historic façades.',
      zh: '一处阅读莱里亚历史立面的站点。',
    },
    {
      pt: 'A Casa dos Pintores integra o itinerário urbano divulgado pelo município e evidencia a variedade de edifícios do núcleo antigo.',
      en: 'The Casa dos Pintores is part of the urban itinerary promoted by the municipality and shows the variety of buildings in the old core.',
      zh: 'Casa dos Pintores 属于市政发布的城市线路，彰显了老城核心区建筑的多样性。',
    },
    {
      pt: 'Repare nas fachadas, na escala das ruas e nos contrastes entre conservação histórica e usos atuais.',
      en: 'Notice the façades, the scale of the streets and the contrasts between historic conservation and current uses.',
      zh: '留意立面、街道的尺度，以及历史保护与当下用途之间的对比。',
    },
    {
      pt: 'É uma visita sobretudo de observação urbana; respeite entradas privadas e eventuais limitações de acesso.',
      en: 'This is mainly an urban-observation visit; respect private entrances and any access limitations.',
      zh: '这主要是一次城市观察之旅；请尊重私人入口及可能的通行限制。',
    },
    {
      pt: 'Continue a pé desde a zona da Misericórdia pelas ruas do percurso histórico municipal.',
      en: 'Continue on foot from the Misericórdia area along the streets of the municipal historic route.',
      zh: '从慈善堂一带继续步行，沿市政历史线路的街巷前行。',
    },
  ),
  place('parque-do-aviao', 'Parque do Avião',
    {
      pt: 'Espaço verde alternativo para uma pausa familiar.',
      en: 'An alternative green space for a family break.',
      zh: '适合家庭小憩的另类绿地。',
    },
    {
      pt: 'O Parque Municipal Tenente Coronel Jaime Filipe da Fonseca é conhecido por Parque do Avião e combina áreas de passeio com equipamentos de lazer.',
      en: 'The municipal park Tenente Coronel Jaime Filipe da Fonseca is known as Parque do Avião and combines walking areas with leisure facilities.',
      zh: 'Tenente Coronel Jaime Filipe da Fonseca 市政公园俗称"飞机公园"，将步行区与休闲设施结合在一起。',
    },
    {
      pt: 'Observe as áreas ajardinadas e a organização de equipamentos recreativos; a experiência difere do jardim histórico central.',
      en: 'Observe the garden areas and the layout of recreational facilities; the experience differs from the central historic garden.',
      zh: '观察绿化区域与休闲设施的布局；体验不同于市中心的历史花园。',
    },
    {
      pt: 'Útil para famílias que procuram uma segunda pausa; confira no local o estado e disponibilidade de equipamentos.',
      en: 'Useful for families looking for a second break; check on site the condition and availability of the facilities.',
      zh: '适合想再歇一歇的家庭；请于现场确认设施的状况与开放情况。',
    },
    {
      pt: 'Planeie esta paragem como extensão do circuito do centro, verificando no mapa o trajeto mais adequado.',
      en: 'Plan this stop as an extension of the central circuit, checking the map for the most suitable route.',
      zh: '可将这一站作为中心环线的延伸来规划，并在地图上确认最合适的路线。',
    },
  ),
  place('jardim-de-santo-agostinho', 'Jardim de Santo Agostinho',
    {
      pt: 'Jardim próximo do conjunto conventual e museológico.',
      en: 'A garden next to the conventual and museum complex.',
      zh: '紧邻修道院建筑群与博物馆的花园。',
    },
    {
      pt: 'Este espaço verde insere-se na frente urbana ligada ao antigo convento de Santo Agostinho e ao Museu de Leiria.',
      en: 'This green space sits in the urban front linked to the former Santo Agostinho convent and the Museu de Leiria.',
      zh: '这片绿地位于与昔日圣奥古斯丁修道院及莱里亚博物馆相连的城市界面上。',
    },
    {
      pt: 'Observe os enquadramentos do edifício histórico vistos do exterior e a relação entre o jardim e a rua.',
      en: 'Observe the views of the historic building from outside and the relationship between the garden and the street.',
      zh: '从外部观察历史建筑的框景，以及花园与街道之间的关系。',
    },
    {
      pt: 'Combine a visita com o museu, sobretudo para alternar espaços interiores e exteriores.',
      en: 'Combine the visit with the museum, especially to alternate indoor and outdoor spaces.',
      zh: '可将参观与博物馆结合，尤其适合在室内外空间之间切换。',
    },
    {
      pt: 'Do Jardim Luís de Camões siga para a área do Museu de Leiria e explore os espaços públicos adjacentes.',
      en: 'From Jardim Luís de Camões head to the Museu de Leiria area and explore the adjacent public spaces.',
      zh: '从 Jardim Luís de Camões 前往莱里亚博物馆一带，探索相邻的公共空间。',
    },
  ),
  place('parque-verde-de-leiria', 'Parque Verde de Leiria',
    {
      pt: 'Caminhada mais longa nas áreas verdes da cidade.',
      en: 'A longer walk through the city’s green areas.',
      zh: '穿越城市绿地的较长徒步。',
    },
    {
      pt: 'O Parque Verde integra a rede de espaços ao ar livre associada ao rio e permite prolongar o passeio para além do centro monumental.',
      en: 'The Parque Verde is part of the network of open spaces associated with the river and lets you extend the walk beyond the monumental centre.',
      zh: '"绿园"属于与河流相连的户外空间网络，可让你把步行延伸至纪念性中心之外。',
    },
    {
      pt: 'Compare as margens urbanizadas com os troços mais abertos e observe os caminhos públicos e a vegetação.',
      en: 'Compare the urbanised banks with the more open stretches and observe the public paths and the vegetation.',
      zh: '将经过整治的河岸与更开阔的段落作比较，并观察公共步道与植被。',
    },
    {
      pt: 'Leve água em dias quentes e adapte a distância à mobilidade do grupo.',
      en: 'Bring water on hot days and adapt the distance to the group’s mobility.',
      zh: '炎热天气请带水，并根据同行者的体力调整距离。',
    },
    {
      pt: 'Parta do jardim e use o percurso ribeirinho, confirmando a continuidade do caminho no mapa.',
      en: 'Start from the garden and use the riverside route, confirming the path’s continuity on the map.',
      zh: '从花园出发，走滨河路线，并在地图上确认步道的连续性。',
    },
  ),
  place('fonte-das-tres-bicas', 'Fonte das Três Bicas',
    {
      pt: 'Detalhe do património quotidiano num roteiro a pé.',
      en: 'A detail of everyday heritage on a walking route.',
      zh: '步行线路中一处日常的遗产细节。',
    },
    {
      pt: 'A fonte consta do percurso urbano municipal e recorda a importância dos pontos de água no desenho da cidade.',
      en: 'The fountain is on the municipal urban route and recalls the importance of water points in the design of the city.',
      zh: '这处喷泉被列入市政城市步道，让人想起供水点在城市布局中的重要地位。',
    },
    {
      pt: 'Observe a composição da fonte e a forma como se insere na rua em vez de procurar uma grande atração isolada.',
      en: 'Observe the composition of the fountain and how it fits into the street, rather than looking for a big standalone attraction.',
      zh: '观察喷泉的构图，以及它如何融入街道，而非去寻找孤立的大景点。',
    },
    {
      pt: 'Funciona melhor como paragem curta entre outros monumentos; não assuma que a água é potável.',
      en: 'It works best as a short stop between other monuments; do not assume the water is drinkable.',
      zh: '它最适合作为其他古迹之间的短暂停留；不要假定水是可饮用的。',
    },
    {
      pt: 'Integre-a no percurso entre o centro histórico e o conjunto de Santo Agostinho.',
      en: 'Fit it into the route between the historic centre and the Santo Agostinho complex.',
      zh: '可将其纳入"历史中心—圣奥古斯丁建筑群"之间的路线。',
    },
  ),
  place('igreja-do-espirito-santo', 'Igreja do Espírito Santo',
    {
      pt: 'Um contraponto à arquitetura civil do centro.',
      en: 'A counterpoint to the centre’s civil architecture.',
      zh: '与市中心民用建筑形成对照的一处。',
    },
    {
      pt: 'A igreja aparece no roteiro histórico oficial de Leiria, contribuindo para a leitura das antigas funções religiosas do bairro.',
      en: 'The church appears on Leiria’s official historic route, helping read the neighbourhood’s former religious functions.',
      zh: '这座教堂出现在莱里亚官方历史线路中，有助于理解该街区昔日的宗教功能。',
    },
    {
      pt: 'Observe os elementos exteriores e a relação entre o volume da igreja e as casas vizinhas.',
      en: 'Observe the exterior elements and the relationship between the church’s volume and the neighbouring houses.',
      zh: '观察外部元素，以及教堂体量与其相邻房屋之间的关系。',
    },
    {
      pt: 'Verifique a possibilidade de visita interior e respeite cerimónias em curso.',
      en: 'Check the possibility of interior visits and respect any ceremonies in progress.',
      zh: '请确认能否进入内部参观，并尊重正在进行中的仪式。',
    },
    {
      pt: 'Combine com o Mercado de Santana e a Fonte das Três Bicas.',
      en: 'Combine it with the Mercado de Santana and the Fonte das Três Bicas.',
      zh: '可将其与桑塔纳市场、三喷池喷泉结合游览。',
    },
  ),
  plan('jardim-historia-1940', 'O Jardim Luís de Camões e a exposição de 1940',
    {
      pt: 'Contexto histórico documentado pela entidade turística municipal.',
      en: 'Historical context documented by the municipal tourism body.',
      zh: '由市政旅游机构记录的历史背景。',
    },
    {
      pt: 'O Visit Leiria refere o jardim como espaço da Exposição Distrital do Bicentenário em 1940, realizada em simultâneo com a Exposição do Mundo Português em Lisboa.',
      en: 'Visit Leiria describes the garden as the venue of the 1940 Bicentennial District Exhibition, held alongside the Portuguese World Exhibition in Lisbon.',
      zh: 'Visit Leiria 将花园描述为 1940 年"二百周年地区展览"的举办地，该展与里斯本的"葡萄牙世界博览会"同期举行。',
    },
    {
      pt: 'Ao caminhar, leia a configuração atual como uma paisagem que continuou a evoluir depois desse evento; não atribua todos os elementos atuais a 1940.',
      en: 'As you walk, read the current layout as a landscape that kept evolving after that event; do not attribute every present element to 1940.',
      zh: '步行时，请将当前的布局视为在该事件之后持续演变的景观；不要把现今的所有元素都归于 1940 年。',
    },
    {
      pt: 'Para pesquisa histórica, comece por fontes municipais e arquivos antes de interpretar fotografias antigas.',
      en: 'For historical research, start with municipal sources and archives before interpreting old photographs.',
      zh: '若做历史研究，请先查阅市政资料与档案馆，再解读老照片。',
    },
    {
      pt: 'Combine a visita ao jardim com a Praça Rodrigues Lobo para compreender o contexto urbano.',
      en: 'Combine the garden visit with Praça Rodrigues Lobo to understand the urban context.',
      zh: '可将花园与 Praça Rodrigues Lobo 结合参观，以理解城市背景。',
    },
  ),
  plan('passeio-centro-historico', 'Passeio pelo centro histórico a partir do jardim',
    {
      pt: 'Percurso pedonal que une zonas verdes e edifícios cívicos.',
      en: 'A walking route linking green spaces and civic buildings.',
      zh: '连接绿地与市政建筑的步行路线。',
    },
    {
      pt: 'O roteiro urbano publicado pelo município liga o jardim, a Praça Rodrigues Lobo, a Sé e o Castelo, atravessando um tecido urbano de origem medieval.',
      en: 'The urban route published by the municipality connects the garden, Praça Rodrigues Lobo, the Sé and the Castle, crossing a medieval-origin urban fabric.',
      zh: '市政发布的城市步道把花园、Praça Rodrigues Lobo、大教堂与城堡相连，穿越源于中世纪的城区肌理。',
    },
    {
      pt: 'Observe como o relevo muda da margem do Lis para a colina e como as ruas passam de abertas a estreitas.',
      en: 'Notice how the terrain changes from the Lis bank to the hill and how the streets go from open to narrow.',
      zh: '留意地形如何从 Lis 河岸过渡到山丘，以及街道如何从开敞变为狭窄。',
    },
    {
      pt: 'Conte com inclinações e pavimento irregular na área alta; ajuste a rota em dias de chuva.',
      en: 'Expect slopes and uneven paving in the upper area; adjust the route on rainy days.',
      zh: '高处区域有坡度和不平整路面；雨天请调整路线。',
    },
    {
      pt: 'Jardim → Praça Rodrigues Lobo → Sé → Igreja de São Pedro → Castelo.',
      en: 'Garden → Praça Rodrigues Lobo → Sé → Igreja de São Pedro → Castle.',
      zh: '花园 → Praça Rodrigues Lobo → 大教堂 → 圣佩德罗教堂 → 城堡。',
    },
  ),
  plan('leiria-com-criancas', 'Leiria com crianças: jardim e paragens fáceis',
    {
      pt: 'Uma visita flexível que alterna movimento e descanso.',
      en: 'A flexible visit that alternates movement and rest.',
      zh: '在活动与休息之间灵活切换的一趟游览。',
    },
    {
      pt: 'O jardim e as margens do Lis oferecem oportunidades de pausa, enquanto o centro histórico acrescenta pequenas descobertas visuais.',
      en: 'The garden and the Lis banks offer chances to rest, while the historic centre adds small visual discoveries.',
      zh: '花园与 Lis 河岸提供休息的机会，而历史中心则增添小巧的视觉发现。',
    },
    {
      pt: 'Convide as crianças a observar pontes, árvores, fachadas e diferenças de altura entre o rio e o castelo.',
      en: 'Invite the children to observe bridges, trees, façades and the height differences between the river and the castle.',
      zh: '邀请孩子观察桥梁、树木、立面，以及河流与城堡之间的高度差。',
    },
    {
      pt: 'Mantenha supervisão junto à água; carrinhos podem encontrar dificultdades nas ruas inclinadas.',
      en: 'Keep supervision near the water; prams may struggle on the inclined streets.',
      zh: '在水边请保持看护；婴儿车在斜坡街道上可能不便。',
    },
    {
      pt: 'Jardim → margem acessível do Lis → Praça Rodrigues Lobo → pausa antes de decidir se sobem ao castelo.',
      en: 'Garden → accessible Lis bank → Praça Rodrigues Lobo → pause before deciding whether to climb to the castle.',
      zh: '花园 → 便于通行的 Lis 河岸 → Praça Rodrigues Lobo → 休息后再决定是否登城堡。',
    },
  ),
  plan('leiria-num-dia-sem-carro', 'Leiria num dia sem carro',
    {
      pt: 'Priorize o núcleo central e evite deslocações desnecessárias.',
      en: 'Prioritise the central core and avoid unnecessary trips.',
      zh: '以中心区为重点，避免不必要的出行。',
    },
    {
      pt: 'Vários pontos de interesse constam do percurso urbano municipal de quatro quilómetros, desenhado para explorar o centro a pé.',
      en: 'Several points of interest are on the four-kilometre municipal urban route, designed to explore the centre on foot.',
      zh: '多个景点位于市政城市步道（约 4 公里）上，专为步行探索中心区而设计。',
    },
    {
      pt: 'Compare o jardim, a praça, a catedral e as vistas altas numa sequência de paisagens distintas.',
      en: 'Compare the garden, the square, the cathedral and the high viewpoints in a sequence of distinct landscapes.',
      zh: '将花园、广场、主教座堂与高处视野，串成一连串不同的景观来对比。',
    },
    {
      pt: 'Use transportes públicos até ao centro e confirme horários de regresso diretamente com o operador.',
      en: 'Use public transport to the centre and confirm return times directly with the operator.',
      zh: '乘公共交通前往中心区，并直接向运营商确认返程时间。',
    },
    {
      pt: 'Jardim → centro pedonal → Sé → Castelo → regresso com pausa na zona ribeirinha.',
      en: 'Garden → pedestrian centre → Sé → Castle → return with a break in the riverside area.',
      zh: '花园 → 步行中心区 → 大教堂 → 城堡 → 返回时在滨河区域休息。',
    },
  ),
  plan('roteiro-fotografico-leiria', 'Roteiro fotográfico em Leiria',
    {
      pt: 'Enquadramentos variados sem depender de um único monumento.',
      en: 'Varied framing without relying on a single monument.',
      zh: '多样的取景，不依赖单一古迹。',
    },
    {
      pt: 'A proximidade entre árvores, água, ruas históricas e a colina do castelo permite trabalhar diferentes escalas numa mesma caminhada.',
      en: 'The proximity of trees, water, historic streets and the castle hill lets you work at different scales on a single walk.',
      zh: '树木、水、历史街巷与城堡山彼此相近，让你在同一次步行中尝试不同尺度。',
    },
    {
      pt: 'Procure reflexos onde o rio estiver calmo, perspetivas de arcadas na praça e vistas amplas nos pontos altos.',
      en: 'Look for reflections where the river is calm, arcade perspectives in the square and wide views from high points.',
      zh: '在河面平静处寻找倒影，在广场寻找拱廊透视，在高处获取开阔视野。',
    },
    {
      pt: 'Evite obstruir passagens e respeite pessoas fotografadas; a iluminação muda rapidamente entre ruas estreitas.',
      en: 'Avoid blocking passage and respect people being photographed; light changes quickly between narrow streets.',
      zh: '不要阻挡通道，并尊重被拍摄的人；光线在窄巷之间变化很快。',
    },
    {
      pt: 'Jardim → ponte pedonal → Praça Rodrigues Lobo → miradouro → Castelo.',
      en: 'Garden → footbridge → Praça Rodrigues Lobo → viewpoint → Castle.',
      zh: '花园 → 人行桥 → Praça Rodrigues Lobo → 观景台 → 城堡。',
    },
  ),
  plan('leiria-dia-de-chuva', 'O que fazer em Leiria num dia de chuva',
    {
      pt: 'Alternativas próximas quando a caminhada perde conforto.',
      en: 'Nearby alternatives when walking loses its comfort.',
      zh: '当步行不再舒适时的就近替代方案。',
    },
    {
      pt: 'O centro reúne edifícios culturais e espaços de visita que podem complementar uma passagem breve pelo jardim.',
      en: 'The centre gathers cultural buildings and visit spaces that can complement a short stop at the garden.',
      zh: '中心区汇聚了文化建筑与可参观空间，能为在花园的短暂停留作补充。',
    },
    {
      pt: 'Observe primeiro o rio e as condições do piso; transfira a maior parte do tempo para museus e igrejas com acesso autorizado.',
      en: 'First observe the river and the ground conditions; move most of your time to museums and churches with authorised access.',
      zh: '先观察河流与地面状况；把大部分时间转移到博物馆与获准进入的教堂。',
    },
    {
      pt: 'Consulte avisos locais e horários, porque chuva intensa pode afetar acessos ribeirinhos.',
      en: 'Check local notices and timetables, as heavy rain may affect riverside access.',
      zh: '请查询当地通知与开放时间，因为大雨可能影响滨河通行。',
    },
    {
      pt: 'Jardim (breve) → Museu de Leiria → centro histórico coberto sempre que possível.',
      en: 'Garden (brief) → Museu de Leiria → covered historic centre whenever possible.',
      zh: '花园（短暂）→ 莱里亚博物馆 → 尽量在有遮蔽的历史中心区。',
    },
  ),
  plan('jardim-melhor-hora', 'Melhor hora para visitar o Jardim Luís de Camões',
    {
      pt: 'Escolha conforme luz, temperatura e ritmo da cidade.',
      en: 'Choose according to light, temperature and the city’s rhythm.',
      zh: '根据光线、气温与城市节奏来选择。',
    },
    {
      pt: 'Sendo um jardim central, a experiência varia com o movimento quotidiano e com a estação do ano.',
      en: 'Being a central garden, the experience varies with daily activity and the season.',
      zh: '作为市中心花园，其体验随日常活动与季节而变化。',
    },
    {
      pt: 'De manhã repare na vegetação e nos caminhos; ao fim da tarde observe a luz sobre a frente urbana e as pontes.',
      en: 'In the morning notice the vegetation and paths; late afternoon observe the light on the urban front and the bridges.',
      zh: '清晨留意植被与小径；傍晚观察落在城市立面与桥梁上的光线。',
    },
    {
      pt: 'No verão privilegie períodos menos quentes; em dias de eventos pode haver mais movimento.',
      en: 'In summer favour the cooler periods; on event days there may be more movement.',
      zh: '夏季优先选择较凉爽的时段；活动日可能更热闹。',
    },
    {
      pt: 'Comece no jardim e prolongue o passeio pela margem do Lis quando as condições forem favoráveis.',
      en: 'Start at the garden and extend the walk along the Lis bank when conditions are favourable.',
      zh: '从花园开始，条件适宜时沿 Lis 河岸延长步行。',
    },
  ),
  plan('jardim-acessibilidade', 'Acessibilidade e mobilidade no centro de Leiria',
    {
      pt: 'Como adaptar o percurso a diferentes necessidades.',
      en: 'How to adapt the route to different needs.',
      zh: '如何让路线适应不同需求。',
    },
    {
      pt: 'Os caminhos do jardim e a zona junto ao rio diferem das ruas inclinadas de acesso ao castelo.',
      en: 'The garden paths and the area by the river differ from the inclined streets up to the castle.',
      zh: '花园小径与河岸区域，不同于通往城堡的斜坡街道。',
    },
    {
      pt: 'Antes de avançar, observe inclinações, atravessamentos, lancis e o piso de cada alternativa.',
      en: 'Before going ahead, observe slopes, crossings, kerbs and the surface of each alternative.',
      zh: '前行前，请观察坡度、过街处、路缘石与每条替代路线的路面。',
    },
    {
      pt: 'Não presuma acessibilidade integral; confirme condições atuais com os serviços municipais ou o destino específico.',
      en: 'Do not assume full accessibility; confirm current conditions with the municipal services or the specific destination.',
      zh: '不要假定全程无障碍；请向市政部门或具体目的地确认当前状况。',
    },
    {
      pt: 'Prefira o jardim, a área ribeirinha e a praça para um circuito de menor desnível.',
      en: 'Prefer the garden, the riverside area and the square for a lower-gradient circuit.',
      zh: '可选择花园、滨河区域与广场，组成落差较小的环线。',
    },
  ),
  plan('estacionamento-jardim', 'Onde estacionar para visitar o Jardim Luís de Camões',
    {
      pt: 'Planeamento de chegada sem prometer vagas.',
      en: 'Arrival planning without promising spaces.',
      zh: '到达规划，但不保证车位。',
    },
    {
      pt: 'O jardim fica numa zona central de Leiria, onde lugares, tarifas e restrições podem variar por rua e horário.',
      en: 'The garden is in a central area of Leiria, where spaces, rates and restrictions can vary by street and time.',
      zh: '花园位于莱里亚的中心区域，车位、费率与限制可能随街道和时段变化。',
    },
    {
      pt: 'Identifique o acesso pedonal mais direto entre o estacionamento escolhido e o jardim.',
      en: 'Identify the most direct pedestrian access between your chosen parking and the garden.',
      zh: '找出所选停车位与花园之间最直接的步行入口。',
    },
    {
      pt: 'Consulte sinalização, zonas de pagamento e eventuais condicionamentos antes de deixar o veículo.',
      en: 'Check signage, paid zones and any restrictions before leaving the vehicle.',
      zh: '离开车辆前，请查看标识、收费区域及可能的限制。',
    },
    {
      pt: 'Defina o Jardim Luís de Camões como destino final e escolha uma opção legal de estacionamento nos arredores.',
      en: 'Set Jardim Luís de Camões as the final destination and choose a legal parking option nearby.',
      zh: '将 Jardim Luís de Camões 设为最终目的地，并在周边选择合法停车方案。',
    },
  ),
  plan('transportes-publicos-leiria', 'Como chegar ao jardim de transportes públicos',
    {
      pt: 'Última etapa da viagem até ao centro de Leiria.',
      en: 'The last leg of the trip to the centre of Leiria.',
      zh: '抵达莱里亚中心前的最后一段路程。',
    },
    {
      pt: 'A localização central permite combinar chegada de autocarro com uma curta caminhada, dependendo da paragem e do serviço.',
      en: 'The central location lets you combine a bus arrival with a short walk, depending on the stop and the service.',
      zh: '中心位置让你能把公交到达与短步行结合，具体取决于站点与班次。',
    },
    {
      pt: 'Confirme no mapa a travessia pedonal mais segura desde a paragem escolhida.',
      en: 'Confirm the safest pedestrian crossing on the map from your chosen stop.',
      zh: '请在地图上确认从所选站点出发最安全的过街路线。',
    },
    {
      pt: 'Horários, linhas e percursos mudam; confirme com o operador antes da viagem.',
      en: 'Schedules, lines and routes change; confirm with the operator before travelling.',
      zh: '班次、线路与路径会变动；出行前请向运营商确认。',
    },
    {
      pt: 'Pesquise o trajeto até ao centro de Leiria e conclua a pé no Jardim Luís de Camões.',
      en: 'Search the route to the centre of Leiria and finish on foot at Jardim Luís de Camões.',
      zh: '查询前往莱里亚中心的路线，最后步行抵达 Jardim Luís de Camões。',
    },
  ),
  plan('jardim-praca-rodrigues-lobo', 'Do Jardim Luís de Camões à Praça Rodrigues Lobo',
    {
      pt: 'Um pequeno percurso urbano de leitura histórica.',
      en: 'A short urban route of historical reading.',
      zh: '一段短小的城市历史解读路线。',
    },
    {
      pt: 'A passagem do Banco de Portugal é mencionada pelo roteiro municipal como ligação do jardim à zona pedonal.',
      en: 'The Banco de Portugal passage is mentioned by the municipal route as the garden’s link to the pedestrian zone.',
      zh: '市政步道提到，葡萄牙银行通道是花园与步行区之间的连接。',
    },
    {
      pt: 'Observe a transição do espaço verde para a malha medieval e a variedade de fachadas.',
      en: 'Observe the transition from the green space to the medieval grid and the variety of façades.',
      zh: '观察从绿地到中世纪街网的过渡，以及立面的多样性。',
    },
    {
      pt: 'Faça o trajeto com calma e aproveite uma pausa na praça, sem depender de reservas.',
      en: 'Take the route calmly and enjoy a break in the square, without needing reservations.',
      zh: '从容走完这段路，并在广场小憩，无需预订。',
    },
    {
      pt: 'Jardim → passagem do Banco de Portugal → ruas pedonais → Praça Rodrigues Lobo.',
      en: 'Garden → Banco de Portugal passage → pedestrian streets → Praça Rodrigues Lobo.',
      zh: '花园 → 葡萄牙银行通道 → 步行街 → Praça Rodrigues Lobo。',
    },
  ),
  plan('jardim-castelo-a-pe', 'Do jardim ao Castelo de Leiria a pé',
    {
      pt: 'Prepare a subida antes de sair.',
      en: 'Prepare for the climb before you leave.',
      zh: '出发前为登坡做好准备。',
    },
    {
      pt: 'A distância no mapa não conta toda a história: o castelo está numa colina e o percurso inclui declives.',
      en: 'The map distance does not tell the whole story: the castle is on a hill and the route includes slopes.',
      zh: '地图上的距离并不说明全部：城堡在山丘上，路线包含陡坡。',
    },
    {
      pt: 'Veja como a vista da fortificação se transforma à medida que sobe pelas ruas históricas.',
      en: 'See how the fortification’s view transforms as you climb the historic streets.',
      zh: '随着你沿历史街巷上行，观察要塞的视野如何逐步变化。',
    },
    {
      pt: 'Use calçado antiderrapante, água e pausas; confirme o acesso ao monumento separadamente.',
      en: 'Wear non-slip shoes, bring water and take breaks; confirm monument access separately.',
      zh: '穿防滑鞋、带水并适时休息；请另行确认纪念碑的开放情况。',
    },
    {
      pt: 'Jardim → Praça Rodrigues Lobo → Sé → subida ao Castelo.',
      en: 'Garden → Praça Rodrigues Lobo → Sé → climb to the Castle.',
      zh: '花园 → Praça Rodrigues Lobo → 大教堂 → 登城堡。',
    },
  ),
  plan('percurso-polis-rio-lis', 'Percurso Polis e margens do Rio Lis',
    {
      pt: 'Uma extensão natural do passeio pelo jardim.',
      en: 'A natural extension of the garden walk.',
      zh: '花园步行的自然延伸。',
    },
    {
      pt: 'Os percursos junto ao Lis formam uma ligação paisagística entre espaços verdes, pontes e áreas de lazer.',
      en: 'The routes along the Lis form a landscape link between green spaces, bridges and leisure areas.',
      zh: '沿 Lis 的步道在绿地、桥梁与休闲区之间形成了景观联系。',
    },
    {
      pt: 'Observe o contraste entre troços de água, estruturas de atravessamento e bairros vizinhos.',
      en: 'Observe the contrast between water stretches, crossing structures and neighbouring districts.',
      zh: '观察水道、跨河构造与相邻街区之间的对比。',
    },
    {
      pt: 'Após precipitação, evite troços com água acumulada e respeite vedações temporárias.',
      en: 'After rainfall, avoid stretches with accumulated water and respect temporary fencing.',
      zh: '降雨后请避开积水路段，并遵守临时围挡。',
    },
    {
      pt: 'Saia do jardim em direção ao rio e escolha um troço aberto, regressando pelo mesmo caminho se necessário.',
      en: 'Leave the garden towards the river and choose an open stretch, returning the same way if needed.',
      zh: '从花园朝河流方向出发，选择一段开阔的步道，必要时原路返回。',
    },
  ),
  plan('leiria-arquitetura', 'Arquitetura de Leiria: castelo, Sé e centro',
    {
      pt: 'Um roteiro por épocas e funções diferentes.',
      en: 'A route through different periods and functions.',
      zh: '一条跨越不同时期与功能的路线。',
    },
    {
      pt: 'A cidade reúne defesa medieval, arquitetura religiosa e espaços cívicos; observar estes elementos em sequência ajuda a compreender a sua evolução.',
      en: 'The city gathers medieval defence, religious architecture and civic spaces; observing these in sequence helps you understand its evolution.',
      zh: '城市汇集了中世纪防御、宗教建筑与市政空间；依次观察这些元素有助于理解其演变。',
    },
    {
      pt: 'Compare muralhas e volumes elevados com fachadas de praça e edifícios religiosos.',
      en: 'Compare ramparts and tall volumes with square façades and religious buildings.',
      zh: '将城墙与高耸体量，同广场立面与宗教建筑作比较。',
    },
    {
      pt: 'Procure informação interpretativa oficial nos monumentos; não trate estilos arquitetónicos como uniformes.',
      en: 'Look for official interpretive information at the monuments; do not treat architectural styles as uniform.',
      zh: '在古迹处寻找官方诠释信息；不要把建筑风格视为单一不变。',
    },
    {
      pt: 'Jardim → Praça Rodrigues Lobo → Sé → Igreja de São Pedro → Castelo.',
      en: 'Garden → Praça Rodrigues Lobo → Sé → Igreja de São Pedro → Castle.',
      zh: '花园 → Praça Rodrigues Lobo → 大教堂 → 圣佩德罗教堂 → 城堡。',
    },
  ),
  plan('leiria-passeio-curto', 'Passeio de 30 a 60 minutos perto do jardim',
    {
      pt: 'Um plano compacto para uma escala ou fim de tarde.',
      en: 'A compact plan for a stopover or late afternoon.',
      zh: '适合中转或傍晚的紧凑计划。',
    },
    {
      pt: 'O centro histórico e o rio permitem uma visita curta sem incluir todos os monumentos da cidade.',
      en: 'The historic centre and the river allow a short visit without including every monument in the city.',
      zh: '历史中心与河流让你无需包含城市所有古迹，也能完成一次短游。',
    },
    {
      pt: 'Concentre-se em três contrastes: vegetação do jardim, água do Lis e fachadas da praça.',
      en: 'Focus on three contrasts: the garden’s vegetation, the Lis water and the square’s façades.',
      zh: '聚焦三种对比：花园的植被、Lis 的水、广场的立面。',
    },
    {
      pt: 'Os tempos são apenas uma referência de ritmo, não uma previsão de trajeto.',
      en: 'The times are only a pace reference, not a route prediction.',
      zh: '这些时间只是节奏参考，并非路线预测。',
    },
    {
      pt: 'Jardim → ponte próxima do Lis → passagem do Banco de Portugal → Praça Rodrigues Lobo.',
      en: 'Garden → nearby Lis bridge → Banco de Portugal passage → Praça Rodrigues Lobo.',
      zh: '花园 → 邻近 Lis 的桥 → 葡萄牙银行通道 → Praça Rodrigues Lobo。',
    },
  ),
  plan('leiria-gastronomia-centro', 'Onde fazer uma pausa para comer no centro de Leiria',
    {
      pt: 'Integre a refeição na caminhada sem confundir estabelecimentos com atrações.',
      en: 'Build the meal into the walk without confusing venues with attractions.',
      zh: '把用餐融入步行，但不把店铺与景点混淆。',
    },
    {
      pt: 'O centro pedonal em redor da Praça Rodrigues Lobo tem cafés e restauração; a oferta e a disponibilidade mudam.',
      en: 'The pedestrian centre around Praça Rodrigues Lobo has cafés and restaurants; the offer and availability change.',
      zh: 'Praça Rodrigues Lobo 周边的步行中心有咖啡馆与餐馆；供应与营业情况会变化。',
    },
    {
      pt: 'Escolha uma esplanada pela localização e confira o menu e preços no próprio estabelecimento.',
      en: 'Choose a terrace by location and check the menu and prices at the venue itself.',
      zh: '按位置选择露天座，并在店铺内核对菜单与价格。',
    },
    {
      pt: 'Não dependa de um restaurante específico sem confirmar abertura e eventuais reservas.',
      en: 'Do not rely on a specific restaurant without confirming opening and any reservations.',
      zh: '在未确认营业与是否需要预订前，不要依赖某家特定餐厅。',
    },
    {
      pt: 'Visite primeiro o jardim e siga para a Praça Rodrigues Lobo para explorar as opções nas ruas próximas.',
      en: 'Visit the garden first and head to Praça Rodrigues Lobo to explore options on the nearby streets.',
      zh: '先游览花园，再前往 Praça Rodrigues Lobo，探索周边街道上的选择。',
    },
  ),
  plan('leiria-fim-de-semana', 'Fim de semana em Leiria: centro e espaços verdes',
    {
      pt: 'Distribua o circuito entre património e descanso.',
      en: 'Spread the circuit between heritage and rest.',
      zh: '在遗产与休憩之间分配行程。',
    },
    {
      pt: 'O centro monumental combina-se facilmente com os percursos do Rio Lis, criando opções para dois dias de ritmo diferente.',
      en: 'The monumental centre combines easily with the Rio Lis routes, creating options for two days of different pace.',
      zh: '纪念性中心可轻松与 Lis 河步道结合，形成两天不同节奏的选择。',
    },
    {
      pt: 'No primeiro dia observe o castelo e a Sé; no segundo privilegie o jardim, pontes e outros parques.',
      en: 'On the first day observe the castle and the Sé; on the second favour the garden, bridges and other parks.',
      zh: '第一天观察城堡与大教堂；第二天以花园、桥梁与其他公园为主。',
    },
    {
      pt: 'Confirme previamente horários dos museus e eventos que possam alterar acessos.',
      en: 'Confirm museum hours and events in advance that may change access.',
      zh: '请提前确认博物馆开放时间与可能影响通行的活动。',
    },
    {
      pt: 'Dia 1: centro histórico e castelo. Dia 2: jardim, rio e Parque Verde.',
      en: 'Day 1: historic centre and castle. Day 2: garden, river and Parque Verde.',
      zh: '第一天：历史中心与城堡。第二天：花园、河流与绿园。',
    },
  ),
];

export const expandedGuideBySlug = new Map(expandedGuides.map((guide) => [guide.slug, guide]));
