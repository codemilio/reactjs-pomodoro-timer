import { HistoryContainer, HistoryList, Status } from './styles'

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
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Commitar</td>
              <td>20min</td>
              <td>Hoje</td>
              <td>
                <Status statusColor="red">Cancelado</Status>
              </td>
            </tr>
            <tr>
              <td>Commitar</td>
              <td>20min</td>
              <td>Hoje</td>
              <td>
                <Status statusColor="yellow">Em andamento</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
