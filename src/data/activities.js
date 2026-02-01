export const activities = [
  // --- EXISTING TOKYO ITEMS ---
  {
    id: 1,
    name: "Shibuya Sky",
    specificActivities: "taking iconic, unobstructed photos at the \"Sky Edge\" corner...",
    description: "229m above scrambling crowds.",
    crowdLevel: "High",
    physicalEffort: "Low",
    image1: "https://www.travelcaffeine.com/wp-content/uploads/2025/01/sarah-bricker-shibuya-sky-observation-deck-scramble-crossing-skyscraper-tokyo-japan-280.jpg",
    image2: "https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/activities/cqrw8fwyig8fesvigr2v.jpg"
  },
  {
    id: 2,
    name: "TeamLab Planets",
    specificActivities: "walking through a water-filled, projected koi pond...",
    description: "Immersive sensory overload.",
    crowdLevel: "High",
    physicalEffort: "Medium", // Walking barefoot, knee-deep water
    image1: "https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/gevr3bbvg613i008ix7v.jpg",
    image2: "https://www.arc-magazine.com/wp-content/uploads/2024/07/TeamLab.jpg"
  },
  {
    id: 3,
    name: "Omoide Yokocho",
    specificActivities: "sampling, drinking with locals, exploring the retro atmosphere...",
    description: "Smoky, post-war vibe.",
    crowdLevel: "High",
    physicalEffort: "Low",
    image1: "https://images.squarespace-cdn.com/content/v1/5d3ee66abacfa00001df6854/6bda2be3-8e08-457b-adfd-3d16c9cec68e/image.png",
    image2: "https://thisgirlabroad.com/wp-content/uploads/2017/05/memory-lane-tokyo-3.jpg"  },
  {
    id: 4,
    name: "Fushimi Inari Shrine",
    specificActivities: "hiking through thousands of vermillion torii gates...",
    description: "Mystical torii gate labyrinth.",
    crowdLevel: "Extreme", // At the bottom
    physicalEffort: "High", // If hiking to the top
    image1: "https://static.wixstatic.com/media/60507d_62d1072427ad43fcacc5197259ec80f7~mv2.png/v1/fill/w_980,h_654,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/60507d_62d1072427ad43fcacc5197259ec80f7~mv2.png",
    image2: "https://www.agoda.com/wp-content/uploads/2024/07/Fushimi-Inari-Shrine-Kyoto-Japan.jpg"
  },
  {
    id: 5,
    name: "Tsukiji Outer Market",
    specificActivities: "tasting fresh sashimi and street food...",
    description: "Dawn seafood paradise.",
    crowdLevel: "Extreme",
    physicalEffort: "Medium", // Lots of walking/standing
    image1: "https://blog.japanwondertravel.com/wp-content/uploads/2021/01/Tsukiji.jpg",
    image2: "https://www.jackieradophotography.com/wp-content/uploads/2020/07/Tsukiji-Auction-floor.jpg"
  },

  // --- GLOBAL HIGH SIGNALS ---

  {
    id: 6,
    name: "Machu Picchu",
    specificActivities: "hiking the steep Inca Trail at sunrise...",
    description: "Cloud-shrouded lost city.",
    crowdLevel: "High",
    physicalEffort: "High", // Steep stairs, altitude
    image1: "https://cdn.mos.cms.futurecdn.net/WFJBpzs4J5x3uvbeKdnm3i.jpg",
    image2: "https://images.ctfassets.net/6kwmfvcr3yfi/4TB3lWNDixGBeV7CWKVYP1/9610143224bdd4d11b6ad18936ddbe0b/machu_picchu_llamas.jpg"  },
  {
    id: 7,
    name: "Serengeti Safari",
    specificActivities: "tracking the Great Migration in a 4x4...",
    description: "Raw wildlife drama.",
    crowdLevel: "Low",
    physicalEffort: "Low", // Sitting in jeep
    image1: "https://www.mgahinganationalpark.org/wp-content/uploads/2024/09/Serengeti-National-Park-1-1.jpg",
    image2: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/16/30/83/serengeti-safari-camp.jpg?w=900&h=500&s=1"
  },
  {
    id: 8,
    name: "Northern Lights (Iceland)",
    specificActivities: "hunting for auroras in a super-jeep...",
    description: "Cosmic light show.",
    crowdLevel: "Low",
    physicalEffort: "Low", // Cold but passive
    image1: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    image2: "https://media.cnn.com/api/v1/images/stellar/prod/220523111444-08-iceland-hot-pools-mvatn.jpg?c=original"
  },
  {
    id: 9,
    name: "Santorini Sunset",
    specificActivities: "sipping Assyrtiko wine on a private caldera terrace...",
    description: "The world's most famous sunset.",
    crowdLevel: "Extreme", // In Oia at sunset
    physicalEffort: "Medium", // Steps
    image1: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80"
  },
  {
    id: 10,
    name: "Amalfi Coast Road Trip",
    specificActivities: "driving a vintage convertible along cliffside roads...",
    description: "Italian dolce vita.",
    crowdLevel: "High",
    physicalEffort: "Low", // Driving
    image1: "https://cdn.kimkim.com/files/a/content_articles/featured_photos/9cfca9ba3cfd18b589b99960d5c7b8902535655a/big-46868363c5dd3f2e1bb0b963d8b500f9.jpg",
    image2: "https://cdn.kimkim.com/files/a/images/efdb13fa73c198591c17e92714c8b491eba092b8/big-3d4e30a164f1a7c0d8b12430fd7b2e0d.jpg"
  },
  {
    id: 11,
    name: "Angkor Wat Sunrise",
    specificActivities: "watching the sun silhouette the lotus towers...",
    description: "Ancient stone empire.",
    crowdLevel: "High",
    physicalEffort: "Medium", // Walking, heat
    image1: "https://www.siemreap.net/wp-content/uploads/2019/02/Equinox-at-Angkor-Wat.jpg",
    image2: "https://evivatour.com/wp-content/uploads/2021/09/Ta-Prohm-Temple-1000x565.jpg",
    image3: "https://angkortravelphotography.opte.io/wp-content/uploads/sites/3064/2017/06/DSCF8413-3b.jpg"
  },
  {
    id: 12,
    name: "Petra by Night",
    specificActivities: "walking through the Siq canyon lit by 1,500 candles...",
    description: "Rose city candlelight.",
    crowdLevel: "High",
    physicalEffort: "Medium", // Walking on sand
    image1: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/06/38/4d/petra-by-night-experience.jpg?w=1200&h=-1&s=1"
  },
  {
    id: 13,
    name: "Cappadocia Hot Air Balloon",
    specificActivities: "floating silently over 'fairy chimney' rock formations...",
    description: "Fairytale flight.",
    crowdLevel: "Medium",
    physicalEffort: "Low",
    image1: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800&q=80",
    image2: "https://www.twowanderingsoles.com/wp-content/uploads/2021/10/Local-Cave-House-2-1024x683.jpg"
  },
  {
    id: 14,
    name: "Jellyfish Lake (Palau)",
    specificActivities: "snorkeling amongst millions of golden, stingless jellyfish...",
    description: "Alien underwater world.",
    crowdLevel: "Low",
    physicalEffort: "Medium", // Snorkeling
    image1: "https://www.airpano.ru/files/jellyfish-lake-palau/images/image1.jpg",
    image2: "https://images.trvl-media.com/place/6117054/d7853b4c-57ae-4385-9e31-c9fb3a730827.jpg"
  },
  {
    id: 15,
    name: "Rio Carnival",
    specificActivities: "dancing in the Sambadrome parade...",
    description: "World's biggest party.",
    crowdLevel: "Extreme",
    physicalEffort: "High", // Dancing, heat
    image1: "https://www.tilda.com/en-ie/wp-content/uploads/sites/8/2022/04/01092146/shutterstock_190431911-1.jpg",
    image2: "https://gccmedia.co/wp-content/uploads/2025/02/new-carnival-2.jpg"
  },
  {
    id: 16,
    name: "Jiufen Old Street",
    specificActivities: "sipping oolong tea in a cliffside teahouse...",
    description: "Mountain town of lanterns and tea.",
    crowdLevel: "Extreme",
    physicalEffort: "Medium", // Lots of stairs
    image1: "https://girleatworld.net/wp-content/uploads/2019/03/jiufen-taiwan-teahouse.jpg",
    image2: "https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/rvreuki39qybtt4xkia5.jpg",
    image3: "https://newtaipei.travel/content/images/attractions/27525/1920x1080_attractions-image-fwfaxumoiegq42wwkiwkpg.jpg"
  },
  {
    id: 17,
    name: "Taipei 101 Observatory",
    specificActivities: "riding the world's fastest elevator...",
    description: "Engineering marvel & status symbol.",
    crowdLevel: "High",
    physicalEffort: "Low",
    image1: "https://i1.wp.com/angelahwang.com/wordpress/wp-content/uploads/2017/05/IMG_0448.jpg?fit=4888%2C3259&ssl=1",
    image2: "https://www.taipei-101.com.tw/asset/img/cover11.jpg",
    image3: "https://img.taipeitimes.com/images/2020/12/02/p11-201202-014.jpg"
  },
  {
    id: 18,
    name: "Raohe Night Market",
    specificActivities: "waiting in line for crispy pepper buns...",
    description: "Sensory food overload.",
    crowdLevel: "Extreme",
    physicalEffort: "Medium", // Crowded walking
    image1: "https://www.justaiwantour.com/wp-content/uploads/2025/06/Raohe_Street_Night_Market.jpg",
    image2: "https://trenchermanstravels.com/wp-content/uploads/2023/12/img_4620.jpg?w=900",
    image3: "https://sethlui.com/wp-content/uploads/2018/02/RaoHe-smelly-tofu-fries-800x573.jpg"
  },
  {
    id: 19,
    name: "Elephant Mountain Hike",
    specificActivities: "climbing steep stone stairs at sunset...",
    description: "Short hike, iconic view.",
    crowdLevel: "High",
    physicalEffort: "High", // Steep stairs
    image1: "https://www.travel.taipei/content/images/attractions/222129/1024x768_attractions-image-fjck6hgjre6acqcp2mhcqq.jpg",
    image2: "https://www.travel.taipei/content/images/attractions/222136/1024x768_attractions-image-d2bf55zrf0ccp-j29xhjpg.jpg"
  },
  {
    id: 20,
    name: "Wat Arun (Temple of Dawn)",
    specificActivities: "climbing the steep, ceramic-tiled steps...",
    description: "The river's most beautiful silhouette.",
    crowdLevel: "High",
    physicalEffort: "Medium", // Very steep steps
    image1: "https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Wat-Arun-Bangkok-Thailand.jpg",
    image2: "https://c8.alamy.com/comp/WDBANY/wat-arun-temple-central-prang-khmer-style-tower-which-is-encrusted-with-colourful-porcelain-in-bangkok-thailand-WDBANY.jpg"
  },
  {
    id: 21,
    name: "Chatuchak Weekend Market",
    specificActivities: "getting lost in a maze of 15,000 stalls...",
    description: "The world's largest weekend market.",
    crowdLevel: "Extreme",
    physicalEffort: "High", // Heat + Walking
    image1: "https://media.timeout.com/images/105923706/750/562/image.jpg",
    image2: "https://www.civitatis.com/f/tailandia/bangkok/guia/mercado-chatuchak.jpg"
  },
  {
    id: 23,
    name: "Muay Thai Fight Night",
    specificActivities: "watching a live fight at Rajadamnern Stadium...",
    description: "Raw action and martial culture.",
    crowdLevel: "High",
    physicalEffort: "Low",
    image1: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/92/4d/54.jpg"

  },
  {
    id: 24,
    name: "Street Go-Karting",
    specificActivities: "driving a go-kart on public roads dressed in costume...",
    description: "Tourist exhilaration (Mario style).",
    crowdLevel: "Low", // Small group
    physicalEffort: "Medium", // Driving focus
    image1: "https://www.monkey-kart.com/public/assets/images/blogs/MONKEY%20KART%20_%20Blog%202%20(2).jpg"

  },
  {
    id: 25,
    name: "Sumo Morning Practice",
    specificActivities: "sitting silently on the floor of a sumo stable...",
    description: "Serious cultural deep dive.",
    crowdLevel: "Low", // Restricted access
    physicalEffort: "Low",
    image1: "https://i0.wp.com/www.touristjapan.com/wp-content/uploads/2023/03/Tokyo_Sumo_Practice_1.jpg?fit=1826%2C1000&ssl=1"
  },
  {
    id: 26,
    name: "Ghibli Museum",
    specificActivities: "getting lost in a whimsical, maze-like mansion...",
    description: "Exclusive artistic whimsy.",
    crowdLevel: "Medium", // Controlled entry
    physicalEffort: "Low",
    image1: "https://www.japan-guide.com/g23/3041_01.jpg",
    image2: "https://cdn.savvytokyo.com/app/uploads/2019/07/Totoro.jpg",
    image3: "https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/xfz1z0ubx7ss5txg2pkf.jpg"
  },
];

