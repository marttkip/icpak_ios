 <!-- Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes-->
        <div class="pages navbar-fixed toolbar-fixed">
          <!-- Index Page-->
           <div class="navbar">
              <div class="navbar-inner">
                  <!-- Left part doesn't related to other pages, let's fade it out -->
                  <div class="left">
                    <a href="#" data-panel="left" class="link icon-only open-panel"> <i class="fa fa-bars"></i></a>
                  </div>
                  <div class="center sliding">ICPAK EVENTS</div>
                  <div class="right">
                    <a href="#" data-panel="right" class="link icon-only open-panel"> <i class="fa fa-shopping-basket"></i></a>
                  </div>
              </div>
          </div>
          <!-- <div data-page="index" class="page"> -->
          <div data-page="icpak-events" class="page" id="events-page">
            <!-- Scrollable page content-->
              <!-- Scrollable page content-->
              <form data-search-list=".list-block-search" data-search-in=".item-title" class="searchbar searchbar-init">
                <div class="searchbar-input">
                  <input type="search" placeholder="Search"><a href="#" class="searchbar-clear"></a>
                </div><a href="#" class="searchbar-cancel">Cancel</a>
              </form>
             
              <!-- Search Bar overlay -->
              <div class="searchbar-overlay"></div>

              <div class="page-content">
                <div class="content-block-title">Our Events</div>
                  <!-- This block will be displayed if nothing found -->
                  <div class="content-block searchbar-not-found">
                    <div class="content-block-inner">Nothing found</div>
                  </div>   
                  <!-- This block will be displayed if anything found, and this list block is used a searbar target -->
                  <div class="list-block list-block-search searchbar-found media-list">
                  <ul class="event-items" id="event_list">
                   
                  </ul>
                </div>
              </div>
          </div>
        </div>
        <!-- Bottom Toolbar-->
       
        <div class="toolbar tabbar tabbar-labels" id="bottom">
            <div class="toolbar-inner">
                <a class="button active" href="events.html" id="events-button">
                    <i class="fa fa-calendar">
                      <!-- <span class="badge bg-red">0</span> -->
                    </i>
                    <span class="tabbar-label">EVENTS</span>
                </a>
                <a href="resources.html" class="button" id="resources-button">
                    <i class="fa fa-download">
                        <span class="badge bg-red">5</span>
                    </i>
                    <span class="tabbar-label">RESOURCES</span>
                </a>
                <a href="recordings.html" class="button" id="live-button">
                    <i class="fa fa-video-camera">
                        <span class="badge bg-red">5</span>
                    </i>
                    <span class="tabbar-label">ICPAK LIVE</span>
                </a>
                <a href="chat.html" class="button" id="chat-button">
                    <i class="fa fa-comment-o">
                      <span class="badge bg-red">5</span>
                    </i>
                    <span class="tabbar-label">CHAT</span>
                </a>
                <a href="profile.html" class="button" id="profile-button">
                    <i class="fa fa-user-md"></i>
                    <span class="tabbar-label">PROFILE</span>
                </a>
            </div>
        </div> 