module.exports = {
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    local_fullname : {
      type: "varchar",
      nullable: true,
    },
    local_email: {
      type: "varchar",
      nullable: true,
    },
    local_password:{
      type: "varchar",
      nullable: true,
    },
    local_phone_no:{
      type: "varchar",
      nullable: true,
    },
    facebook_id : {
      type: "varchar",
      nullable: true,
    },
    facebook_display_name : {
      type: "varchar",
      nullable: true,
    },
    facebook_email : {
      type: "varchar",
      nullable: true,
    },
    facebook_token : {
      type: "varchar",
      nullable: true,
    },
    facebook_propic_url : {
      type: "varchar",
      nullable: true,
    },
    google_id : {
      type: "varchar",
      nullable: true,
    },
    google_email : {
      type: "varchar",
      nullable: true,
    },
    google_display_name : {
      type: "varchar",
      nullable: true,
    },
    google_token : {
      type: "varchar",
      nullable: true,
    },
    google_propic_url : {
      type: "varchar",
      nullable: true,
    },
    is_admin: {
      type: "boolean",
      default: false
    }
  }
}
