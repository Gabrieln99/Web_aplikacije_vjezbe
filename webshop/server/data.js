class Proizvod {
  constructor(
    id,
    naziv,
    cijena,
    velicine,
    opis,
    slike,
    dostupne_boje,
    karakteristike
  ) {
    this.id = id;
    this.naziv = naziv;
    this.cijena = cijena;
    this.velicine = velicine;
    this.opis = opis;
    this.slike = slike;
    this.dostupne_boje = dostupne_boje;
    this.karakteristike = karakteristike;
  }
}
const proizvodi = [
  new Proizvod(
    1,
    "Crna majica",
    30,
    ["XS", "S", "M", "L"],
    "Majica je odlična za svakodnevno nošenje jer je izrađena od visokokvalitetnog pamuka koji pruža udobnost i prozračnost tokom cijelog dana. Svojim jednostavnim, ali modernim dizajnom, savršena je za sve prilike, bilo da idete na posao, u šetnju ili na opušteno druženje s prijateljima. Crna boja majice čini je svestranom i lako kombiniranom s različitim odjevnim kombinacijama, a njezin klasični kroj osigurava slobodu kretanja i eleganciju. Uz to, materijal je izuzetno izdržljiv, lako se održava i ostaje u odličnom stanju i nakon više pranja.",
    [
      "https://contents.mediadecathlon.com/p2731051/k$a5101619bc9d2c6d690fb567a0392aff/men-s-fitness-t-shirt-sportee-100-black-domyos-8572641.jpg?f=1920x0&format=auto",
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1695457335_2236257.jpg?v=2",
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1695457335_2236257.jpg?v=2",
      "https://contents.mediadecathlon.com/p2731051/k$a5101619bc9d2c6d690fb567a0392aff/men-s-fitness-t-shirt-sportee-100-black-domyos-8572641.jpg?f=1920x0&format=auto",
      "https://isto.pt/cdn/shop/files/Classic_T-shirt_Black_1_4b42b483-c2cf-46f6-805c-90bd905b4338.webp?v=1685716490",
    ],
    ["crna", "siva"],
    ["Materijal: pamuk", "Masa: 80 g", "Održavanje: Prati na 60°C"]
  ),
  new Proizvod(
    2,
    "Traperice Tommy Hilfiger",
    80,
    ["S", "M", "L"],
    "Traperice Tommy Hilfiger izrađene su od visokokvalitetnog materijala koji pruža savršenu ravnotežu između udobnosti i izdržljivosti. S pažljivo odabranim pamukom i elastinom, ove traperice garantiraju dugotrajan oblik i elasticitet, što ih čini idealnim izborom za svakodnevno nošenje. Klasičan kroj u kombinaciji s modernim detaljima omogućuje lako usklađivanje s različitim stilovima, od casual do sofisticiranih odjevnih kombinacija. S njihovim prepoznatljivim stilom i diskretnim logom na stražnjem džepu, ove traperice dodaju dašak luksuza svakodnevnoj garderobi, a istovremeno pružaju potpunu slobodu kretanja. Lako se održavaju i zadržavaju svoj izgled čak i nakon više pranja, čineći ih odličnim izborom za dugoročno ulaganje u kvalitetnu modu.",
    [
      "https://tommy-europe.scene7.com/is/image/TommyEurope/DM0DM09553_1BK_main?$b2c_updp_m_mainImage_1920$",
      "https://tommy-europe.scene7.com/is/image/TommyEurope/MW0MW15603_1BB_main?$b2c_updp_m_mainImage_1920$",
      "https://tommy-europe.scene7.com/is/image/TommyEurope/MW0MW15603_1BB_main?$b2c_updp_m_mainImage_1920$",
      "https://tommy-europe.scene7.com/is/image/TommyEurope/DM0DM09553_1BK_main?$b2c_updp_m_mainImage_1920$",
    ],
    ["plava", "crna", "siva"],
    ["Materijal: pamuk", "Masa: 500 g", "Održavanje: Prati na 40°C"]
  ),
  new Proizvod(
    3,
    "Zimska kapa North Face",
    40,
    ["Onesize"] /*stavio sam u zagrade jer ruzno izgleda ako nije*/,
    "North Face kapa je idealan izbor za ljubitelje vanjskih aktivnosti i urbane mode. Izrađena od visokokvalitetnih materijala, ova kapa nudi odličnu zaštitu od sunca i vjetra, bilo da ste na planinarenju, trekkingu ili jednostavno u šetnji po gradu",
    [
      "https://www.sportvision.hr/files/images/slike_proizvoda/media/NF0/NF0A3FJXJK31/images/NF0A3FJXJK31.jpg",
      "https://img.modivo.cloud/product(3/0/a/3/30a3fb152d7af9aad985a989de209da556bab8b8_20_0196573246218_KC.jpg,jpg)/the-north-face-kapa-salty-bae-lined-beanienf0a7wjln3n1-bijela-0196573246218.jpg",
      "https://img.modivo.cloud/product(3/0/a/3/30a3fb152d7af9aad985a989de209da556bab8b8_20_0196573246218_KC.jpg,jpg)/the-north-face-kapa-salty-bae-lined-beanienf0a7wjln3n1-bijela-0196573246218.jpg",
      "https://img2.ans-media.com/i/840x1260/AW22-CAK05F-09X_F1.webp?v=1730833332",
    ],
    ["crna", "bijela", "siva"],
    ["Materijal: vuna", "Masa: 100 g", "Održavanje: Prati na 30°C"]
  ),
  new Proizvod(
    4,
    "Čarape Adidas",
    20,
    ["32-36", "37-39", "40-42", "45-48"],
    "Adidas čarape su savršen spoj udobnosti, funkcionalnosti i stila. Izrađene od visokokvalitetnih materijala, ove čarape pružaju odličnu prozračnost i iznimnu udobnost tijekom cijelog dana. Bilo da ih nosite za sport, treninge ili svakodnevno nošenje, Adidas čarape nude savršenu podršku stopalima, čineći ih idealnim izborom za sve aktivne osobe. Sadrže tehnologiju koja upija vlagu, pomažući vam da ostanete suhi i ugodni, dok elastičan pojas osigurava sigurno i udobno pristajanje. Prepoznatljiv Adidas logo na stranici dodaje im sportsku notu i čini ih odličnim dodatkom svakodnevnim kombinacijama. Dostupne u različitim bojama i stilovima, Adidas čarape su izvrstan izbor za sve koji žele kvalitetu i funkcionalnost u jednom.",
    [
      "https://www.sportvision.hr/files/images/slike_proizvoda/media/DZ9/DZ9393/images/DZ9393.jpg",
      "https://img01.ztat.net/article/spp-media-p1/b8257221318f474d9ecf726faf4bf6c7/c80724d8789845bb826bfcb1c966327b.jpg?imwidth=1800&filter=packshot",
      "https://img01.ztat.net/article/spp-media-p1/b8257221318f474d9ecf726faf4bf6c7/c80724d8789845bb826bfcb1c966327b.jpg?imwidth=1800&filter=packshot",
      "https://www.sportvision.hr/files/images/slike_proizvoda/media/DZ9/DZ9393/images/DZ9393.jpg",
    ],
    ["crna", "bijela"],
    ["Materijal: pamuk", "Masa: 50 g", "Održavanje: Prati na 40°C"]
  ),
  new Proizvod(
    5,
    'Tenisice Nike "Air Force 1"',
    200,
    ["38", "39", "40", "41", "42", "43", "44", "45"],
    " Tenisice Nike Air Force 1 su ikona urbane mode koja spaja klasik i moderni dizajn. S prepoznatljivim stilom, ove tenisice nude nevjerojatnu udobnost zahvaljujući tehnologiji Air cushioning u potplatu, koja pruža izuzetnu amortizaciju i podršku tijekom cijelog dana. Izrađene od visokokvalitetne kože, Air Force 1 tenisice dolaze u klasičnom bijelom izdanju, ali i u raznim varijantama boja, čime ostaju svestran odabir za sve kombinacije, od casual outfita do sportskih lookova. Ove tenisice su svestrane i dugotrajne, jednostavne za održavanje, a istovremeno ostaju stilski izuzetno atraktivne. Prepoznatljive 'Air Force' linije i logo na bočnoj strani dodaju im dodatnu dozu prepoznatljivosti i statusa. Bez obzira jeste li na terenu ili u gradu, Nike Air Force 1 tenisice donose savršen spoj udobnosti, stila i trajne popularnosti.",
    [
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/e380b4ea-ec2c-4ee6-8acd-10b338a954fe/AIR+FORCE+1+LE+%28GS%29.png",
      "https://www.buzzsneakers.hr/files/thumbs/files/images/slike-proizvoda/media/DR0/DR0155-001/images/thumbs_800/DR0155-001_800_800px.jpg",
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
    ],
    ["crna", "bijela", "siva"],
    ["Materijal: koža", "Masa: 1000 g", "Održavanje: Prati na 40°C"]
  ),
];

export { Proizvod, proizvodi };
