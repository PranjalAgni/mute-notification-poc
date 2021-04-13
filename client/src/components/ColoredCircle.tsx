import './styles/ColoredCircle.css';

const ColoredCircle = ({ color, name }: { color: string; name: string }) => {
  const styles = { backgroundColor: color };

  return color ? (
    <>
      <span className="colored-circle" style={styles} />
      {name}
    </>
  ) : null;
};

export default ColoredCircle;
