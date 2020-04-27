import { useRouter } from "next/router";

// This gets called on every request
export const getServerSideProps = () => {
    // Fetch data from external API

    const data = { requestedAt: Date.now() };

    // Pass data to the page via props
    return { props: { data } };
};

const App = ({ data }) => {
    const router = useRouter();
    const { name } = router.query;
    return (
        <div>
            <p>
                {`Hello, ${name}!`}
            </p>
            <p>
                {`Requested at: ${data.requestedAt}`}
            </p>

        </div>
    );
};

export default App;
