

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover, Spinner } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import apiFetch from '@wordpress/api-fetch';




class PGMailSubsctibe extends Component {


  render() {

    var {
      // library,
      // srcType,


    } = this.props;


    function SubscribeForm() {
      const [emailSubscribe, setEmailSubscribe] = useState({ email: '', status: null, loading: false });
      const [hasSubscribed, setHasSubscribed] = useState(false);

      const [PostGridPluginData, setPostGridPluginData] = useState(window.PostGridPluginData);

      useEffect(() => {
        apiFetch({
          path: '/post-grid/v2/get_site_details',
          method: 'POST',
          data: {},
        }).then((res) => {
          //
          setEmailSubscribe({ ...emailSubscribe, email: res.email, status: res.subscribe_status });

          var hasSubscribed = (res.subscribe_status == 'subscribed') ? true : false;
          setPostGridPluginData({ ...PostGridPluginData, hasSubscribed: hasSubscribed });



        });
      }, []);


      return (

        <div className='grid grid-cols-2 gap-2 mb-5'>

   

          {hasSubscribed && (
            <div className='col-span-2 bg-green-700 text-white py-2 px-2 my-2'>Thanks for subscribe!</div>
          )}


          {PostGridPluginData.hasSubscribed == false && (

            <>


              <div className='col-span-2'>


                <InputControl
                  value={emailSubscribe.email}
                  className="!py-2 rounded-none"
                  onChange={(newVal) => {

                    //setEmailSubscribe({ ...emailSubscribe, email: newVal });

                  }
                  }
                />
              </div>

              {emailSubscribe.loading && (
                <Spinner />
              )}



              <div className='col-span-2'>
                <div className='px-3 py-2 text-center bg-lime-700 text-white cursor-pointer' onClick={ev => {

                  setEmailSubscribe({ ...emailSubscribe, loading: true });


                  apiFetch({
                    path: '/post-grid/v2/email_subscribe',
                    method: 'POST',
                    data: { email: emailSubscribe.email },
                  }).then((res) => {

                    //

                    setEmailSubscribe({ ...emailSubscribe, loading: false, status: res.subscribe_status });

                    setHasSubscribed(true);
                    setPostGridPluginData({ ...PostGridPluginData, hasSubscribed: true });



                    setTimeout(() => {

                      setHasSubscribed(false);


                    }, 3000);



                  });


                }}>Subscribe to News</div>
              </div>
              <div className='col-span-2'>
                <div className='px-3 py-2 text-center bg-gray-700 text-white cursor-pointer' onClick={ev => {

                  setEmailSubscribe({ ...emailSubscribe, loading: true });

                  apiFetch({
                    path: '/post-grid/v2/email_subscribe',
                    method: 'POST',
                    data: { interested: false },
                  }).then((res) => {

                    //
                    setEmailSubscribe({ ...emailSubscribe, loading: false, status: res.subscribe_status });

                  });

                }}>No Interested</div>
              </div>


            </>

          )
          }


        </div >




      )

    }


    return (


      <SubscribeForm />


    )
  }
}


export default PGMailSubsctibe;