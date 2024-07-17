import { HistoryContainer, HistoryList } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Commitar</td>
              <td>20min</td>
              <td>Hoje</td>
              <td>Em andamento</td>
            </tr>
            <tr>
              <td>Commitar</td>
              <td>20min</td>
              <td>Hoje</td>
              <td>Em andamento</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
