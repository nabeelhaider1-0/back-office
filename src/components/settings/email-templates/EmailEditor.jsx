import React from "react";
import { Editor } from "@tinymce/tinymce-react";

// Core + essential modules
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom";

// All free plugins available in TinyMCE 6
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

export default function EmailEditor({ value, onChange, disabled }) {
  return (
    <Editor
      value={value}
      onEditorChange={onChange}
      disabled={disabled}
      init={{
        license_key: "gpl",
        base_url: "/node_modules/tinymce",
        suffix: ".min",
        height: 600,
        menubar: true,
        plugins: [
          "advlist",
          "anchor",
          "autolink",
          "autosave",
          "charmap",
          "code",
          "codesample",
          "directionality",
          "emoticons",
          "fullscreen",
          "help",
          "image",
          "importcss",
          "insertdatetime",
          "link",
          "lists",
          "media",
          "nonbreaking",
          "pagebreak",
          "preview",
          "save",
          "searchreplace",
          "table",
          "visualblocks",
          "visualchars",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
          "link image media table | charmap emoticons insertdatetime | removeformat preview code fullscreen | help",
        branding: false,
        promotion: false,
        skin: "oxide",
        content_css: "default",

        /* ✅ Base64 Image Support */
        automatic_uploads: false,
        images_upload_handler: function (blobInfo, success, failure) {
          // Convert image to base64 and insert directly
          success("data:" + blobInfo.blob().type + ";base64," + blobInfo.base64());
        },

        file_picker_types: "image",
        file_picker_callback: function (cb, value, meta) {
          if (meta.filetype === "image") {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = function () {
              const file = this.files[0];
              const reader = new FileReader();

              reader.onload = function () {
                cb(reader.result, { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          }
        },
      }}
    />
  );
}
