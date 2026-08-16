import DBManager from "./DBManager";

class ProjectManager {
  saveProject(project: any) {
    const content = JSON.stringify(DBManager.getDB(project.id).getContent());
    const blob = new Blob([content], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${project.title || "project"}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  loadProject() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const project = JSON.parse(await file.text());
      const db = DBManager.getAppDB();
      const id = db.getId("projects_id");
      project.info.id = id;
      project.notes.forEach((note: any) => (note.project_id = id));
      db.write("projects", project.info);
      DBManager.load(id);
      const projectDB = DBManager.getDB(id);
      projectDB.setValue("info", project.info);
      projectDB.setValue("notes", project.notes || []);
      projectDB.setValue("milestones", project.milestones || []);
      window.location.reload();
    };
    input.click();
  }
}

export default new ProjectManager();
