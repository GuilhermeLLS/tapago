# Tá pago! 

O projeto Tá Pago! tem como objetivo criar uma rede de acompanhamento coletivo e incentivo de pares através de postagens compartilhando fotos de atividades físicas e dos resultados individuais.  

## Membros do Grupo
- Augusto Carvalho Porto Pereira
- Guilherme Luiz Lara Silva
- Rafael Bicalho Roth
- Vinicius Gabriel de Carvalho

## Descrição do Sistema
### Funcionalidades Principais

1. Criar publicação
   - Escrever uma legenda
   - Fazer o upload de uma foto
   - Disponibilizar instantaneamente para toda a rede

2. Ordenar publicações
   - Ordem cronológica
   - Crescente ou decrescente

3. Pesquisar posts
   - Digitar as palavras-chave na barra de pesquisa
     - As postagens são recomendadas enquanto o usuário digita a pesquisa
     - A metodologia utilizada é a "distância de strings":
       - São comparados os termos da pesquisa com os possíveis resultados
       - Serão sugeridos aos usuários os termos que mais se assemelhem
   - Restarão exibidos na tela do usuário os resultados correspondentes
### Tecnologias Utilizadas
O código fonte do "Tá Pago!" utiliza as tecnologias e ferramentas abaixo:

- Front-end:
  - Framework: React
  - Estilização: CSS
    - Tailwind
    - PostCSS
  - Testes: 
    - Vitest
    - Cypress
  - Gerenciador de pacotes: npm, yarn

- Back-end: 
  - Framework: Supabase
  - Testes: Vitest 

- Ferramentas de Desenvolvimento:
  - Vite
  - ESLint
  - Prettier

O grupo optou pelo uso de React.js no front-end pela experiência dos membros com o framework. A escrita simples e reutilizável de componentes e páginas foi de suma importância para o desenvolvimento rápido do projeto. 

Os frameworks de teste Vitest e Cypress foram utilizados para os testes unitários e de sistema (e2e), pelo conhecimento da equipe nas ferramentas e pelo amplo uso destas pelo mercado.

No back-end, foi utilizado o framework Supabase por se tratar de uma ferramenta low code, em especial bem aplicável neste sistema por permitir a criação de um back-end simples de forma prática e rápida.

As ferramentas de desenvolvimento listadas acima são aplicadas no ambiente de desenvolvimento local dos desenvolvedores e são versionadas no repositório principalmente para garantir que todos estejam seguindo os mesmos padrões de desenvolvimento.