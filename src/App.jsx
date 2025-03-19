import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLayout, MainLayout, UserLayout } from "./layouts";
import IndexPage from "./pages/IndexPage";
import { AdminLogin, Recovery, RecoveryReset, RecoveryResult, RecoveryVerify, Register, UserLogin } from "./pages/auth";

import ErrorPage from "./pages/exception/ErrorPage";
import { UserHomePage, UserUpdate } from "./pages/user";
import { AccountPage, ForeignRegister, TransactionRecord } from "./pages/account";
import { AdminHomePage, Approval, Management, Statistics } from "./pages/admin";
import TransferPage from "./pages/transfer/TransferPage";
import { ExchangeCheck, ExchangePage, ExchangeRate, ExchangeResult } from "./pages/exchange";
import { TransferCheck, TransferResult } from "./pages/transfer";







function App() {
  
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/bank">

            <Route path="index" element={ <><MainLayout /></>} >   {/* React Router 中的預設載入畫面，作用相當於 path="" */}
              <Route index element={ <><IndexPage/></>} />
            </Route>

            <Route path="auth" element={ <MainLayout />}>
              <Route path="userlogin"        element={ <><UserLogin/>      </>} />      {/* 子路由路徑不加斜線 / ( 依附在 /bank/auth 下 ) */}
              <Route path="adminlogin"       element={ <><AdminLogin/>     </>} />
              <Route path="recovery"         element={ <><Recovery/>       </>} />
              <Route path="recovery/verify"  element={ <><RecoveryVerify/> </>} />
              <Route path="recovery/reset"   element={ <><RecoveryReset/>  </>} />
              <Route path="recovery/result"  element={ <><RecoveryResult/> </>} />
              <Route path="register"         element={ <><Register/>       </>} />
            </Route>

            <Route path="user" element={ <UserLayout />}>
              <Route path="home"   element={ <><AccountPage/></> }/>
              <Route path="update" element={ <><UserUpdate/> </> }/>
            </Route>

            <Route path="accounts" element={ <><UserLayout /> </> }>
              <Route index            element={ <><AccountPage/>       </> }/>
              <Route path="foreigns"  element={ <><ForeignRegister/>   </> }/>
              <Route path="histories" element={ <><TransactionRecord/> </> }/>

            </Route>
            
            <Route path="transaction" element={ <><UserLayout /></> } >
              <Route path="transfer"        element={ <><TransferPage/>  </> }/>
              <Route path="transfer/check"  element={ <><TransferCheck/> </> }/>
              <Route path="transfer/result" element={ <><TransferResult/></> }/>
              <Route path="exchange"        element={ <><ExchangePage/>  </> }/>
              <Route path="exchange/check"  element={ <><ExchangeCheck/> </> }/>
              <Route path="exchange/result" element={ <><ExchangeResult/></> }/>
              <Route path="exchange-rate"   element={ <><ExchangeRate/>  </> }/>
            </Route>



            <Route path="admin" element={ <AdminLayout />}>
              <Route path="home"          element={ <> <Approval />   </> }/>
              <Route path="user-approval" element={ <> <Approval />   </> }/>
              <Route path="user-manage"   element={ <> <Management /> </> }/>
              <Route path="statistics"    element={ <> <Statistics /> </> }/>

            </Route>



            <Route path="*" element={ <><ErrorPage/></>} />   {/* Route path="*" 讓所有未知路由都進入 404 頁面 */}

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App ;
