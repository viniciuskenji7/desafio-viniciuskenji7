

export class AbrigoAnimais {

  constructor() {

    //Lista oficial de Animais
    this.animais = [
      "Rex", 
      "Mimi", 
      "Fofo", 
      "Zero", 
      "Bola", 
      "Bebe", 
      "Loco"
    ];
  //Lista oficial de Brinquedos
    this.brinquedos = [
      "RATO",
      "BOLA",
      "LASER",
      "CAIXA",
      "NOVELO",
      "SKATE"
    ];
    //Lista oficial de preferencia
    this.preferencia = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"]
    };
  }

  encontraPessoas(brinqP1, brinqP2, ordemAnimais) {
      // Configurando entradas
      const brinq1 =  brinqP1.split(",").map(brinq => brinq.trim().toUpperCase());
      const brinq2 = brinqP2.split(",").map(brinq => brinq.trim().toUpperCase());
      const listaAnimais = ordemAnimais.split(",").map(animal => animal.trim());

      //Validação de Brinquedos
      const todosBrinqs = [...brinq1, ...brinq2];
      for (let brinq of todosBrinqs) {
        if (!this.brinquedos.includes(brinq)) {
          return {erro: "Brinquedo Inválido"};
        }
      }
      
      //Verificação de duplicata dos Brinquedos
      if (new Set(brinq1).size !== brinq1.length || new Set(brinq2).size !== brinq2.length) {
        return {erro: "O brinquedo não pode se repetir"};
      }

      //Validação dos Animais
      const todosAnimais = [...listaAnimais];
      for (let animal of todosAnimais) {
        if(!this.animais.includes(animal)) {
          return {erro: "Animal Inválido"};
        }
      }
      //Verificando duplicata de Animais
      if (new Set(listaAnimais).size !== listaAnimais.length) {
        return {erro: "O animal não pode se repetir"};
      }

      // Objeto para organizar a lista
      const resultado = {
        pessoa1: [],
        pessoa2: [],
        abrigo: []
      };

      // Verificando entrada 
      for (let animal of listaAnimais) {
        
        let prefAnimal = this.preferencia[animal];

        // Verifica se é uma subsequencia
        const subsequencia = (pai, sequencia) => {
          // Se o parametro for falso ou for = a 0 ele sai da function
          if (!pai || pai.length === 0) return true;
          let i = 0;
          // Verificando sequencia
          for (const item of sequencia) {
            if (item === pai[i]) i++;
            if (i === pai.length) return true;
          }
          return false;
        };

        let todosP1 = subsequencia(prefAnimal, brinq1);
        let todosP2 = subsequencia(prefAnimal, brinq2);

        if (todosP1 && !todosP2) {
          resultado.pessoa1.push(animal);
        } else if (todosP2 && !todosP1) {
          resultado.pessoa2.push(animal);
        } else if (todosP1 && todosP2) {
          resultado.abrigo.push(animal);
        } else {
          resultado.abrigo.push(animal);
        }

      }
      
      //Tratamento para maximo de adoção
      let p1 = resultado.pessoa1;
      let p2 = resultado.pessoa2;
      let abr = resultado.abrigo;
      if (p1.length > 3 || p2.length > 3) {
        return {erro: "Uma pessoa so pode adotar 3 animais"};
      }

      // Configurando saída
      const saida = [];
      // Pessoa 1
      for (let animal of p1) {
        saida.push(`${animal} - pessoa 1`);
      }
      // Pessoa 2
      for (let animal of p2) {
        saida.push(`${animal} - pessoa 2`);
      }
      // Abrigo
      for (let animal of abr) {
        saida.push(`${animal} - abrigo`);
      }

      // Ordena o array
      saida.sort();
      //  retorna lista
      return {lista: saida};
      
  }
  

}

let teste = new AbrigoAnimais().encontraPessoas(
  "RATO, BOLA, CAIXA, NOVELO", 
  "CAIXA, BOLA, LASER, SKATE", 
  "Rex, Mimi, Loco");


console.log(teste);
