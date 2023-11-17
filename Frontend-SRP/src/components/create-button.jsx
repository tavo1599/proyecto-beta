function CreateButton(props){
    return (
        <>
            <button className="button-create">
                {props.ico && <i className={props.ico}></i>}
                {props.text}
            </button>
        </>
    )
}
export default CreateButton;
