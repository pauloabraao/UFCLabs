import TicketsTable from './TicketsTable';

function TicketGrid({ tickets }) {
    return (
        <div className="ticket-grid">
            <TicketsTable
                key={tickets.map(ticket => ticket.id)}
                tickets={tickets}
            />
        </div>
    );
}

export default TicketGrid;