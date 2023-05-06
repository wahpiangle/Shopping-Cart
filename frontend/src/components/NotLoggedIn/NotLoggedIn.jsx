import "./NotLoggedIn.css";

export default function NotLoggedIn(props) {
    return (
        <div>
            <h1>Please Login to see the {props.text}</h1>
        </div>
    )
}