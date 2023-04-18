interface CardItemProps {
  className: string;
  title: string;
  content: string;
}

const CardItem = (props: CardItemProps) => {
  return (
    <div className={props.className}>
      <h4>{props.title}</h4>
      <p>{props.content}</p>
    </div>
  );
};
export default CardItem;
