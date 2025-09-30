type Props = { ask: string; onYes: () => void }
export default function Confirm({ ask, onYes }: Props) {
  return (
    <button
      className='ghost'
      onClick={() => {
        if (confirm(ask)) onYes()
      }}
    >
      Delete
    </button>
  )
}
