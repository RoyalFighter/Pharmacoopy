// Users.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 import { getCountSummary } from '../../API';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

function Users() {
  const dispatch = useDispatch();
  const countSummary = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useOidcAccessToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountSummary(accessToken);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching count summary:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, dispatch]);

  return (
    <div>
      <h2>Count Summary</h2>
      {loading ? (
        <p>Loading count summary...</p>
      ) : (
        <table>
         <table>
          <thead>
            <tr>
              <th>Company Count</th>
              <th>Project Count</th>
              <th>Admin Count</th>
              <th>Total User Count</th>
              <th>Last Company Updated Date</th>
              <th>Last Project Updated Date</th>
              <th>Last Admin User Updated Date</th>
              <th>Last Regular User Updated Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{countSummary.companyCount}</td>
              <td>{countSummary.projectCount}</td>
              <td>{countSummary.adminCount}</td>
              <td>{countSummary.totalUserCount}</td>
              <td>{countSummary.lastCompanyUpdatedDate}</td>
              <td>{countSummary.lastProjectUpdatedDate}</td>
              <td>{countSummary.lastAdminUserUpdatedDate}</td>
              <td>{countSummary.lastRegularUserUpdatedDate}</td>
            </tr>
          </tbody>
        </table>
        </table>
      )}
    </div>
  );
}

export default Users;
