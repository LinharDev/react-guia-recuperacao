
import { useState } from "react";
import "./App.css";

// CONTEÚDOS DO GUIA
const conteudos = [
  {
    id: "git",
    numero: "01",
    titulo: "Git e GitHub",
    resumo: "Git controla versões do projeto localmente. GitHub hospeda repositórios remotamente.",
    explicacao: "Commit registra alterações, push envia os commits para o GitHub e branch cria uma linha de desenvolvimento separada. O Git é a ferramenta de controle de versão local.",
    exemplo: "Criar uma branch para desenvolver uma nova tela, fazer um commit e enviar as alterações com git push.",
    erro: "Erro: acreditar que salvar um arquivo atualiza o GitHub. Correção: utilizar git add, git commit e git push."
  },
  {
    id: "node",
    numero: "02",
    titulo: "Node.js e npm",
    resumo: "Node.js executa JavaScript fora do navegador. npm gerencia pacotes e dependências.",
    explicacao: "O Node.js fornece o ambiente de execução. O npm permite instalar bibliotecas, controlar dependências e executar scripts definidos no package.json.",
    exemplo: "Executar npm install para instalar dependências e npm run dev para iniciar o projeto.",
    erro: "Erro: tentar utilizar uma biblioteca que não foi instalada. Correção: instalar o pacote com npm install nome-do-pacote."
  },
  {
    id: "react",
    numero: "03",
    titulo: "React e JSX",
    resumo: "React é uma biblioteca JavaScript para criar interfaces. JSX permite escrever estruturas semelhantes a HTML dentro do JavaScript.",
    explicacao: "Com JSX podemos misturar elementos visuais com expressões JavaScript. É necessário utilizar className em vez de class e fechar corretamente as tags.",
    exemplo: "Criar um título utilizando <h1>Meu projeto React</h1>.",
    erro: "Erro: utilizar class em JSX. Correção: utilizar className para definir classes CSS."
  },
  {
    id: "componentes",
    numero: "04",
    titulo: "Componentes e props",
    resumo: "Componentes são funções que retornam JSX. Props permitem enviar informações de um componente para outro.",
    explicacao: "Os componentes devem começar com letra maiúscula. As props permitem reutilizar o mesmo componente com diferentes informações.",
    exemplo: "Um Card recebe titulo e descricao por props e apresenta esses dados na tela.",
    erro: "Erro: criar um componente chamado card. Correção: utilizar Card, começando com letra maiúscula."
  },
  {
    id: "estado",
    numero: "05",
    titulo: "Estado e Hooks",
    resumo: "useState permite guardar informações que podem mudar durante a utilização da aplicação.",
    explicacao: "Quando o estado é atualizado, o React renderiza novamente a interface. A forma funcional do setter é indicada quando o próximo valor depende do anterior.",
    exemplo: "Utilizar useState para controlar se um conteúdo foi revisado.",
    erro: "Erro: alterar diretamente uma variável de estado ou declarar useState dentro de um if. Correção: utilizar o setter e declarar Hooks no início do componente."
  },
  {
    id: "eventos",
    numero: "06",
    titulo: "Eventos e validação",
    resumo: "Eventos permitem executar funções quando o usuário interage com a página.",
    explicacao: "onClick responde aos cliques. O trim() remove espaços do início e do final de uma string, ajudando a validar campos de texto.",
    exemplo: "Ao adicionar uma dúvida, utilizar texto.trim() para impedir o cadastro de campos vazios.",
    erro: "Erro: utilizar onClick={adicionar()}. Correção: passar a função como referência, utilizando onClick={adicionar}."
  },
  {
    id: "listas",
    numero: "07",
    titulo: "Listas e imutabilidade",
    resumo: "map() permite percorrer arrays e renderizar vários elementos na interface.",
    explicacao: "Cada elemento de uma lista precisa de uma key estável. Para atualizar arrays no estado, devemos criar um novo array utilizando spread, map ou filter.",
    exemplo: "Utilizar conteudos.map() para gerar os oito cards automaticamente.",
    erro: "Erro: utilizar push() diretamente no estado ou não informar key. Correção: criar um novo array e utilizar um identificador estável."
  },
  {
    id: "arquitetura",
    numero: "08",
    titulo: "Arquitetura web",
    resumo: "Frontend é a parte visual, backend processa informações e API permite a comunicação entre sistemas.",
    explicacao: "localStorage armazena informações no navegador. SPA é uma aplicação de página única. PWA oferece recursos adicionais, como instalação e possibilidade de funcionamento offline quando configurada.",
    exemplo: "Um frontend React consulta uma API para buscar produtos e utiliza localStorage para guardar uma preferência.",
    erro: "Erro: confundir SPA com PWA. Correção: SPA descreve a navegação da aplicação; PWA descreve recursos adicionais de uma aplicação web."
  }
];

// COMPONENTE HEADER
function Header() {
  return (
    <header className="header">
      <a href="#inicio" className="logo">
        &lt;/&gt; DevGuide<span>.</span>
      </a>

      <nav>
        <a href="#inicio">Início</a>
        <a href="#conteudos">Conteúdos</a>
        <a href="#duvidas">Minhas dúvidas</a>
      </nav>
    </header>
  );
}

// COMPONENTE CARD
function CardConceito({ conteudo, revisado, onAlternar }) {
  return (
    <article className={`card ${revisado ? "revisado" : ""}`}>

      <div className="card-top">
        <span className="numero">{conteudo.numero}</span>

        {revisado && (
          <span className="selo">✓ Revisado</span>
        )}
      </div>

      <h3>{conteudo.titulo}</h3>

      <p className="resumo">
        {conteudo.resumo}
      </p>

      <div className="explicacao">
        <h4>Entenda</h4>
        <p>{conteudo.explicacao}</p>
      </div>

      <div className="exemplo">
        <h4>Exemplo prático</h4>
        <p>{conteudo.exemplo}</p>
      </div>

      <div className="erro">
        <h4>Erro comum e correção</h4>
        <p>{conteudo.erro}</p>
      </div>

      <button
        className="btn-revisar"
        onClick={() => onAlternar(conteudo.id)}
      >
        {revisado
          ? "✓ Revisado — desmarcar"
          : "Marcar como revisado"}
      </button>

    </article>
  );
}

// COMPONENTE DE DÚVIDAS
function ListaDuvidas() {
  const [texto, setTexto] = useState("");
  const [duvidas, setDuvidas] = useState([]);
  const [aviso, setAviso] = useState("");

  function adicionarDuvida(event) {
    event.preventDefault();

    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      setAviso("Digite uma dúvida válida!");
      return;
    }

    const novaDuvida = {
      id: crypto.randomUUID(),
      texto: textoLimpo
    };

    setDuvidas((atuais) => [...atuais, novaDuvida]);

    setTexto("");
    setAviso("Dúvida adicionada com sucesso!");
  }

  function removerDuvida(id) {
    setDuvidas((atuais) =>
      atuais.filter((duvida) => duvida.id !== id)
    );
  }

  return (
    <section className="duvidas" id="duvidas">

      <div className="titulo-secao">
        <span>ORGANIZE SEUS ESTUDOS</span>
        <h2>Minhas dúvidas</h2>
        <p>Registre os assuntos que você ainda precisa entender.</p>
      </div>

      <form onSubmit={adicionarDuvida} className="form-duvidas">

        <input
          type="text"
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
          placeholder="Ex.: Como funcionam props?"
        />

        <button type="submit">
          Adicionar +
        </button>

      </form>

      {aviso && (
        <p className="aviso">{aviso}</p>
      )}

      {duvidas.length === 0 ? (
        <div className="vazio">
          <span>?</span>
          <p>Nenhuma dúvida cadastrada.</p>
        </div>
      ) : (
        <ul className="lista-duvidas">

          {duvidas.map((duvida) => (
            <li key={duvida.id}>
              <span>{duvida.texto}</span>

              <button
                type="button"
                onClick={() => removerDuvida(duvida.id)}
              >
                ×
              </button>
            </li>
          ))}

        </ul>
      )}

    </section>
  );
}

// COMPONENTE PRINCIPAL
export default function App() {

  const [revisados, setRevisados] = useState([]);

  function alternarRevisao(id) {
    setRevisados((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id]
    );
  }

  return (
    <>
      <Header />

      <main id="inicio">

        <section className="hero">

          <div className="hero-texto">
            <span className="etiqueta">
              GUIA INTERATIVO DE APRENDIZAGEM
            </span>

            <h1>
              Aprenda. Pratique.
              <br />
              <span>Construa.</span>
            </h1>

            <p>
              Aprenda os principais fundamentos do
              desenvolvimento web com explicações,
              exemplos práticos e atividades interativas.
            </p>

            <a href="#conteudos" className="btn-principal">
              Começar a estudar ↓
            </a>
          </div>

          <div className="hero-code">
            <div className="code-top">
              <i></i><i></i><i></i>
            </div>

            <p><span>const</span> aprendizado = {"{"}</p>
            <p className="indent">prática: <b>true</b>,</p>
            <p className="indent">progresso: <b>"contínuo"</b></p>
            <p>{"}"};</p>

            <span className="code-label">
              &lt;React /&gt;
            </span>
          </div>

        </section>

        <section className="progresso">

          <div>
            <span className="etiqueta">SEU PROGRESSO</span>
            <h2>Continue no seu ritmo.</h2>
            <p>Marque os conteúdos depois de estudar.</p>
          </div>

          <div className="contador">

            <strong>
              {revisados.length}
              <small> / 8 revisados</small>
            </strong>

            <div className="barra">
              <span
                style={{
                  width: `${(revisados.length / 8) * 100}%`
                }}
              ></span>
            </div>

          </div>

        </section>

        <section className="conteudos" id="conteudos">

          <div className="titulo-secao">
            <span>FUNDAMENTOS • 8 TÓPICOS</span>
            <h2>Seu guia de estudos</h2>
            <p>
              Confira os conceitos, exemplos e erros comuns
              de cada conteúdo.
            </p>
          </div>

          <div className="cards">

            {conteudos.map((conteudo) => (
              <CardConceito
                key={conteudo.id}
                conteudo={conteudo}
                revisado={revisados.includes(conteudo.id)}
                onAlternar={alternarRevisao}
              />
            ))}

          </div>

        </section>

        <ListaDuvidas />

      </main>

      <footer>
        <a href="#inicio" className="logo">
          &lt;/&gt; DevGuide<span>.</span>
        </a>

        <p>Desenvolvimento web • React • Estudos</p>
      </footer>
    </>
  );
}
