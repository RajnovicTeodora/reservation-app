// material-ui
import MainCard from '../../../ui-component/cards/MainCard';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import Accommodations from '../accommodations-view/Accommodations';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    return (
        <MainCard
            style={{
                maxHeight: 'calc(100vh - 130px)',
                backgroundColor: 'transparent',
                borderColor: 'transparent',
            }}
        >
            <PerfectScrollbar
                style={{
                    height: '100%',
                    maxHeight: 'calc(100vh - 205px)',
                    overflowX: 'hidden',
                }}
            >
                <Accommodations />
            </PerfectScrollbar>
        </MainCard>
    );
};

export default SamplePage;
