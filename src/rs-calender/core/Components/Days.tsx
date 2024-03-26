type Days = {
  size: number,
  daysFormat?: number
}

export default function Days(props: Days) {
  const { size, daysFormat = 1 } = props;

  let days = [
    { number: 0, label: daysFormat === 1 ? 's' : "sun" },
    { number: 1, label: daysFormat === 1 ? 'm' : "mon" },
    { number: 2, label: daysFormat === 1 ? 't' : "tue" },
    { number: 3, label: daysFormat === 1 ? 'w' : "wed" },
    { number: 4, label: daysFormat === 1 ? 't' : "thur" },
    { number: 5, label: daysFormat === 1 ? 'f' : "fri" },
    { number: 6, label: daysFormat === 1 ? 's' : "sat" }
  ];

  return (
    <div
      style={{
        height: 'auto',
        width: '100%',
        display: 'flex',
      }}
    >
      {days.map((day, i) => (
        <div
          key={i}
          style={{
            height: size,
            width: size
          }}
          className="center"
        >
          <p style={{ textTransform: 'capitalize', fontWeight: '500' }}>{day.label}</p>
        </div>
      ))}
    </div>
  )
}