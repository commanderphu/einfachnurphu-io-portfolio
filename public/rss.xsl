<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          body { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; background: #0f0d0d; color: #f1f1f1; margin: 0; padding: 32px; }
          .wrap { max-width: 880px; margin: 0 auto; }
          h1 { font-size: 28px; margin: 0 0 8px; }
          p.desc { color: #bdbdbd; margin: 0 0 24px; }
          a { color: #ff9100; text-decoration: none; }
          .meta { color: #9a9a9a; font-size: 12px; margin-bottom: 24px; }
          .item { border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 16px 18px; margin: 12px 0; background: rgba(255,255,255,.02); }
          .item h2 { font-size: 18px; margin: 0 0 6px; }
          .item p { margin: 6px 0 0; color: #cfcfcf; }
          .tags { margin-top: 10px; font-size: 12px; color: #9a9a9a; }
          .tag { display: inline-block; margin-right: 8px; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="desc"><xsl:value-of select="/rss/channel/description"/></p>
          <div class="meta">
            Feed: <a href="{/rss/channel/link}"><xsl:value-of select="/rss/channel/link"/></a>
          </div>

          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h2>
                <a href="{link}">
                  <xsl:value-of select="title"/>
                </a>
              </h2>
              <div class="meta">
                <xsl:value-of select="pubDate"/>
              </div>
              <p><xsl:value-of select="description"/></p>
              <xsl:if test="category">
                <div class="tags">
                  <xsl:for-each select="category">
                    <span class="tag">#<xsl:value-of select="."/></span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
