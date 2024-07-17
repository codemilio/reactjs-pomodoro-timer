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
              <th>Commitar</th>
              <th>20min</th>
              <th>Hoje</th>
              <th>Em andamento</th>
            </tr>
            <tr>
              <th>Commitar</th>
              <th>20min</th>
              <th>Hoje</th>
              <th>Em andamento</th>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
