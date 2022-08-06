import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Icon, Heading} from '@chakra-ui/react';

import ReportCard from '../components/ReportCard';
import { getAllReports } from '../services/ReportServices';
import { Construction } from '@mui/icons-material';

const ReportsforAdmin = () => {

  const [reports, setReports] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllReports()
      .then((result) => {
        setReports(result.reports);
      });
  }, [refresh]);

  return (
    <Box px={{ base: 3, md: 5 }} py={10} display='flex' width='100%' flexDirection='column'>
      <Text fontSize='32' my={5} fontWeight={600} color='facebook.500' textAlign='center' >Reports</Text>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3} >
        {
          reports.length>0 && reports.map((report) => {
            return <ReportCard
              key={report._id}
              reportId={report._id}
              orderId={report.orderId}
              userId={report.userId}
              content={report.content}
              createdAt={report.createdAt}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          })
        }
      </SimpleGrid>
      {
          reports.length===0 && <Box display='flex' justifyContent='center'>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            mt={10}
            p={3}
          >
            <Icon color='#314E89' fontSize={100} as={Construction} />
            <Heading textAlign='center' fontSize={30} mt={8}  >All Problems solved.</Heading>
          </Box>
        </Box>
        }
    </Box>
  )
}

export default ReportsforAdmin;