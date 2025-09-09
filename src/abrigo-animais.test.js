import {AbrigoAnimais} from "./abrigo-animais.js";


describe('Abrigo de Animais', () => {
  
  //Animal Inválido
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe("Animal Inválido");
    expect(resultado.lista).toBeFalsy();
  });
  //Animal Duplicado
  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO, BOLA', 'CAIXA, RATO', 'Rex, Rex');
    expect(resultado.erro).toBe("O animal não pode se repetir");
    expect(resultado.lista).toBeFalsy();
  });

  //Brinquedo Inválido
  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('PATO, RATO', 'CAIXA, BOLA', 'Rex, Loco');
    expect(resultado.erro).toBe("Brinquedo Inválido");
    expect(resultado.lista).toBeFalsy();
  });

  //Brinquedo Duplicado
  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO, RATO', 'CAIXA, BOLA', 'Rex, Loco');
    expect(resultado.erro).toBe("O brinquedo não pode se repetir");
    expect(resultado.lista).toBeFalsy();
  });
  // Encontrando pessoa para animal
  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });
  // Encontrando intercalando
  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  }); 
  // Animal no abrigo caso as 2 pessoas puderem adota-lo
  test('Deve manter animal no abrigo pela condição das duas pessoas serem verdadeiras', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA, LASER', 'BOLA, LASER', 'Mimi');

    expect(resultado.lista[0]).toBe('Mimi - abrigo');
  });
  // Condição de apenas 3 animais
  test('Deve retornar um erro, informando a quantidade maxima de animais para adoção', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('Rato, Bola, Laser, Caixa, Novelo', 'Bola, Novelo', 'Rex, Mimi, Zero, Bola');

    expect(resultado.erro).toBe('Uma pessoa so pode adotar 3 animais');
  });

  
});
