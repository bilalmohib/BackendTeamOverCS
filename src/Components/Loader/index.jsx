import "./index.css";

const Loader = (props) => {
    return (
        <div>
            <div class="loading">Loading&#8230;</div>
            <div class="text-center">
                <br />
                <br />
                <h2 className="text-dark">{props.text}</h2>
            </div>
        </div>
    )
}
export default Loader;