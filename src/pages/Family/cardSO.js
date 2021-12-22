import './style.css';

const CardSO = (props) => {
const {nodeData} = props;

console.log(nodeData+"hello")

    return (
        <div className="card-so-wrapper">
        {nodeData.name}
      </div>
    );
}

export default CardSO;