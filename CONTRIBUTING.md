# Guia de Contribuição

Obrigado por considerar contribuir para o **Forum Invasores**! Este guia irá orientá-lo através dos passos para contribuir para o projeto.

## Como Contribuir

### Relatando Bugs

Se você encontrar um bug, por favor, abra uma [Issue](https://github.com/alescrocaro/forum-invasores/issues) no GitHub com as seguintes informações:

- **Descrição detalhada** do problema.
- **Passos para reproduzir** o bug.
- **Comportamento esperado** versus o **comportamento atual**.
- **Capturas de tela** ou **logs** se aplicável.
- **Ambiente** (sistema operacional, versão do software, etc.).

### Sugerindo Funcionalidades

Estamos abertos a novas ideias! Para sugerir uma nova funcionalidade:

- Verifique se a funcionalidade já não foi sugerida nas [Issues existentes](https://github.com/alescrocaro/forum-invasores/issues).
- Abra uma nova Issue com o título prefixado por `Feature Request:` e inclua:
  - **Descrição da funcionalidade**.
  - **Problema que ela resolve**.
  - **Exemplos de uso**.

### Melhorando a Documentação

A documentação é crucial. Se você encontrar erros ou áreas que podem ser melhoradas:

- Faça um fork do repositório.
- Edite os arquivos de documentação.
- Abra um Pull Request com as suas alterações.

### Enviando Pull Requests

Contribuições de código são bem-vindas! Para enviar um Pull Request (PR):

1. **Contate um mantenedor** através de uma issue no repositório.
2. **Aceite o convite de colaborador**
3. **Crie uma nova branch** para sua funcionalidade ou correção:

   ```bash
   git checkout -b minha-feature
   ```

4. **Implemente suas alterações**, seguindo as diretrizes de estilo de código.
5. **Escreva testes** para suas alterações, se aplicável.
6. **Commit suas alterações** com mensagens claras e descritivas em inglês (guie-se pelo [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)):

   ```bash
   git commit -m "feat(scope): added feature X"
   ```

7. **Envie suas alterações** para sua branch:

   ```bash
   git push origin minha-feature
   ```

8. **Abra um Pull Request** no repositório:

   - Descreva detalhadamente as mudanças.
   - Referencie quaisquer Issues relacionadas.

## Configuração do Ambiente de Desenvolvimento

Para configurar o ambiente localmente siga os passos descritos no [README](./README.md)

## Estilo de Codificação

Mantenha a consistência do código:

- Siga os padrões de estilo já existentes no projeto.
- Use comentários claros e concisos, se preciso - não faça comentários desnecessários.
- Evite código redundante.

## Testes (opcional)

- **Adicione testes** para novas funcionalidades.
- **Execute todos os testes** antes de enviar um PR:

  ```bash
  # Comando para rodar testes
  ```

## Comunicação

- Use as [Issues](https://github.com/alescrocaro/forum-invasores/issues) para discutir bugs e funcionalidades.

## Licença

Ao contribuir para o **Forum Invasores**, você concorda que suas contribuições serão licenciadas sob a [Licença MIT](./LICENSE).

---

Agradecemos por seu interesse em contribuir! Juntos, podemos tornar o **Forum Invasores** ainda melhor.
