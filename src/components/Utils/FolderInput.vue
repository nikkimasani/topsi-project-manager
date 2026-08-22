<template>
  <v-toolbar class="mx-2 pa-2 px-4 transparent elevation-0">
    <v-text-field
      :label="label ? label : 'Folder'"
      class="pt-2 mt-1"
      light
      v-model="folder"
      solo
    ></v-text-field>
    <div v-if="isElectronApp">
      <v-icon v-if="folderExists" color="success">
        mdi-check
      </v-icon>
      <v-icon v-else color="error">
        mdi-close
      </v-icon>
    </div>
    <v-btn
      v-if="isElectronApp"
      @click="openDialog"
      class="elevation-5 justify-right text-xs-right"
      color="primary"
      style="border-radius:0;"
    >
      {{ this.$lang.Get("browse") }}
    </v-btn>
  </v-toolbar>
</template>
<script>
import { isElectron } from "@/core/Environment";

export default {
  name: "FolderInput",
  props: {
    value: String,
    label: String
  },
  data() {
    return {
      folder: this.value,
      isElectronApp: isElectron()
    };
  },
  watch: {
    folder(value) {
      this.$emit("input", this.folder);
    }
  },
  computed: {
    folderExists() {
      if (!this.isElectronApp) return true;
      return require("fs").existsSync(this.folder);
    }
  },
  methods: {
    openDialog() {
      if (!this.isElectronApp) return;
      const electron = require("electron");
      const path = require("path");
      const { dialog } = electron.remote;
      // Get the selected folder by the user.
      this.folder = dialog.showOpenDialog(electron.remote.getCurrentWindow(), {
        properties: ["openDirectory", "createFolder"]
      });

      // Adds the separator at the end.
      this.folder += path.sep;
    }
  }
};
</script>

<style scoped></style>
