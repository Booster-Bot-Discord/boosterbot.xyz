const PageBody = props => {
    return (
        <section className="scrollbar">
            {props.children}
        </section>
    );
}

export default PageBody;