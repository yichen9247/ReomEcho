
<script setup>
    import "./assets/HomePage.css"
</script>

<template>
    <div class="admin-page page-home">
        <div class="card-list">
            <t-row :gutter="16">
                <t-col :span="3">
                    <div class="card-box">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" width="1.45em" height="1.45em" class="h-5 w-5"><path fill="currentColor" d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993ZM11 5H4v14h7V5Zm2 0v14h7V5h-7Zm1 2h5v2h-5V7Zm0 3h5v2h-5v-2Z"></path></svg>
                        </div>
                    </div>
                </t-col>
                <t-col :span="3">
                  <div class="card-box">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" width="1.45em" height="1.45em" class="h-5 w-5"><path fill="currentColor" d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8Zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6Zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4Zm2.595 7.811a3.505 3.505 0 0 1 0-1.622l-.992-.573l1-1.732l.992.573A3.498 3.498 0 0 1 17 14.645V13.5h2v1.145c.532.158 1.012.44 1.405.812l.992-.573l1 1.732l-.991.573a3.512 3.512 0 0 1 0 1.622l.991.573l-1 1.732l-.992-.573a3.495 3.495 0 0 1-1.405.812V22.5h-2v-1.145a3.495 3.495 0 0 1-1.405-.812l-.992.573l-1-1.732l.992-.573ZM18 19.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"></path></svg>
                        </div>
                    </div>
                </t-col>
                <t-col :span="3">
                  <div class="card-box">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" width="1.45em" height="1.45em" class="h-5 w-5"><path fill="currentColor" d="M2 8.994A5.99 5.99 0 0 1 8 3h8c3.313 0 6 2.695 6 5.994V21H8c-3.313 0-6-2.695-6-5.994V8.994ZM20 19V8.994A4.004 4.004 0 0 0 16 5H8a3.99 3.99 0 0 0-4 3.994v6.012A4.004 4.004 0 0 0 8 19h12Zm-6-8h2v2h-2v-2Zm-6 0h2v2H8v-2Z"></path></svg>
                        </div>
                    </div>
                </t-col>
                <t-col :span="3">
                    <div class="card-box">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" width="1.45em" height="1.45em" class="h-5 w-5"><path fill="currentColor" d="M12 3c5.392 0 9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.819 9c-5.392 0-9.878-3.88-10.818-9C2.122 6.88 6.608 3 12 3Zm0 16a9.005 9.005 0 0 0 8.778-7a9.005 9.005 0 0 0-17.555 0A9.005 9.005 0 0 0 12 19Zm0-2.5a4.5 4.5 0 1 1 0-9a4.5 4.5 0 0 1 0 9Zm0-2a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5Z"></path></svg>
                        </div>
                    </div>
                </t-col>
            </t-row>
        </div>
    </div>
</template>