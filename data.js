window.SP_DATA = {
  products: [
    { id:'olympus', name:'Olympus Supps Creatina Monohidratada', presentation:'60 servidas', price:12.50, category:'Creatinas', image:'assets/creatinas/olympus-final.webp', status:'Disponible / bajo pedido' },
    { id:'nutrex60', name:'Nutrex Creatine Monohydrate', presentation:'60 servidas', price:14.00, category:'Creatinas', image:'assets/creatinas/nutrex.webp', status:'Disponible / bajo pedido' },
    { id:'creakong', name:'Creakong CX8', presentation:'30 servidas', price:12.00, category:'Creatinas', image:'assets/creatinas/creakong.png?v=3', status:'Disponible / bajo pedido' },
    { id:'oneofone', name:'One of One Creatine Monohydrate', presentation:'200 servidas', price:37.00, category:'Creatinas', image:'assets/creatinas/oneofone.webp', status:'Bajo pedido' },
    { 
      id: 'r1source7', 
      name: 'R1 Source7 Proteína', 
      presentation: '1.8 lb', 
      price: 35.00, 
      category: 'Proteínas', 
      image: 'assets/r1-whey-1.8lb/R1SMilkCh.png', 
      status: 'Bajo pedido',
      highlights: [
        '22g de proteína por servicio',
        '7 fuentes de absorción gradual',
        'Textura suave y cremosa'
      ],
      description: 'Fórmula que combina 4 fuentes de suero lácteo, aislado de leche, caseína micelar y proteína vegetal para una recuperación sostenida.',
      benefits: [
        'Estimula la síntesis y reparación muscular prolongada.',
        'Excelente saciedad: ideal post-entreno o entre comidas.',
        'Perfil completo de aminoácidos esenciales (EAAs).'
      ],
      usage: 'Mezclar 1 scoop en 6 a 8 oz de agua fría o leche descremada.',
      flavors: [
        { name: 'Milk Chocolate', image: 'assets/r1-whey-1.8lb/R1SMilkCh.png' },
        { name: 'Chocolate Peanut Butter', image: 'assets/r1-whey-1.8lb/R1SChocP.png' },
        { name: 'Pistachio', image: 'assets/r1-whey-1.8lb/R1SPist.png' },
        { name: 'Salted Caramel', image: 'assets/r1-whey-1.8lb/R1SCaramS.png' },
        { name: 'Vanilla Creme', image: 'assets/r1-whey-1.8lb/R1SVain.png' },
        { name: 'Cookies & Creme', image: 'assets/r1-whey-1.8lb/R1SCookiC.png' }
      ]
    },
    { 
      id: 'r1whey2lb', 
      name: 'R1 Whey Protein (100% Whey)', 
      presentation: '2.0 lb', 
      price: 45.00, 
      category: 'Proteínas', 
      image: 'assets/r1-whey-2lb/R1BanaCr.png', 
      status: 'Bajo pedido',
      highlights: [
        '24g de proteína 100% de suero (WPC, WPI, WPH)',
        '11g de EAAs y más de 5g de BCAAs naturales',
        'Digestión rápida y textura suave'
      ],
      description: 'Fórmula basada exclusivamente en tres fuentes de proteína de suero de leche de rápida absorción. Diseñada para acelerar la recuperación muscular post-entrenamiento.',
      benefits: [
        'Acelera la reparación de fibras musculares tras entrenamientos intensos.',
        'Absorción rápida: ideal para el post-entreno o para un aporte proteico rápido durante el día.',
        'Baja en grasas y azúcares añadidos. Sin rellenos.'
      ],
      usage: 'Mezclar 1 scoop en 6 a 8 oz de agua fría, leche o tu bebida favorita en cualquier momento del día para alcanzar tu meta de proteína.',
      flavors: [
        { name: 'Banana Creme', image: 'assets/r1-whey-2lb/R1BanaCr.png' },
        { name: 'Café Mocha', image: 'assets/r1-whey-2lb/R1CafM.png' },
        { name: 'Chocolate Fudge', image: 'assets/r1-whey-2lb/R1ChocoF.png' },
        { name: 'Chocolate Peanut Butter', image: 'assets/r1-whey-2lb/R1ChocoPea.png' },
        { name: 'Cookies & Creme', image: 'assets/r1-whey-2lb/R1CookCr.png' },
        { name: 'Fruity Cereal', image: 'assets/r1-whey-2lb/R1FruitC.png' },
        { name: 'Salted Caramel', image: 'assets/r1-whey-2lb/R1SaltedCar.png' },
        { name: 'Strawberries & Creme', image: 'assets/r1-whey-2lb/R1StrawberCre.png' },
        { name: 'Vanilla', image: 'assets/r1-whey-2lb/R1Vaini.png' }
      ]
    },
    { id:'r1mass', name:'R1 Mass Gainer', presentation:'6 lb', price:42.00, category:'Ganadores de peso', image:'assets/mass-gainer/R1.webp?v=3', status:'Bajo pedido' },
    { id:'mutantmass', name:'Mutant Mass Extreme 2500', presentation:'6 lb', price:41.00, category:'Ganadores de peso', image:'assets/mass-gainer/Mutant Mass Extreme 6 lb.webp?v=3', status:'Bajo pedido' },
    { id:'lipo6', name:'Nutrex Lipo-6 Black Ultra Concentrate', presentation:'2 unidades', price:36.00, category:'Otros', image:'assets/quemadores/Duo Lipo6.jpg?v=3', status:'Disponible / bajo pedido' }
  ],
  combos: [
    { name:'Combo Volumen', description:'Mutant Mass Extreme 6 lb + Olympus Creatina 60 servidas', price:49.00, badge:'Destacado', image:'assets/combos/Combo Volumen.jpg' },
    { name:'Combo Creatina Pro', description:'One of One Creatine 200 servidas + Creakong CX8', price:46.99, badge:'Alto valor', image:'assets/combos/Combo Creatina Pro.jpg' },
    { name:'Combo Volumen Plus', description:'Mutant Mass Extreme 6 lb + Creakong CX8', price:50.99, badge:'Volumen', image:'assets/combos/Combo Volumen Plus.jpg' },
    { name:'Combo Proteína y Creatina', description:'R1 Source7 1.8 lb + Creakong CX8', price:44.99, badge:'Equilibrado', image:'assets/combos/Combo Proteína y Creatina.jpg' }
  ]
};