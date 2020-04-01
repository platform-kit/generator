// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/libgit2.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

 
  void GitLibgit2::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

       v8::Local<Object> object = Nan::New<Object>();
         Nan::SetMethod(object, "features", Features);
         Nan::SetMethod(object, "init", Init);
         Nan::SetMethod(object, "opts", Opts);
         Nan::SetMethod(object, "shutdown", Shutdown);
         Nan::SetMethod(object, "version", Version);
  
    Nan::Set(
      target,
      Nan::New("Libgit2").ToLocalChecked(),
         object
     );
  }

  
/*
   * @return Number  result    */
NAN_METHOD(GitLibgit2::Features) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
    );

 int result =     git_libgit2_features(
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @return Number  result    */
NAN_METHOD(GitLibgit2::Init) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
    );

 int result =     git_libgit2_init(
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
        NAN_METHOD(GitLibgit2::Opts)
{
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Number option is required.");
  }

  const int from_option = (int)info[0].As<v8::Number>()->Value();

  git_error_clear();

  v8::Local<v8::Value> to = Nan::Undefined();
  switch (from_option) {
    // GET size_t
    case GIT_OPT_GET_MWINDOW_SIZE:
    case GIT_OPT_GET_MWINDOW_MAPPED_LIMIT:
    case GIT_OPT_GET_PACK_MAX_OBJECTS: {
      size_t option_value;
      if (git_libgit2_opts(from_option, &option_value)) {
        return Nan::ThrowError("git_libgit2_opts failed");
      }
      to = Nan::New<Number>(option_value);
      break;
    }
    // GET bool
    case GIT_OPT_GET_WINDOWS_LONGPATHS: {
      int option_value;
      if (git_libgit2_opts(from_option, &option_value)) {
        return Nan::ThrowError("git_libgit2_opts failed");
      }
      to = option_value ? Nan::True() : Nan::False();
      break;
    }
    // GET unsigned long
    case GIT_OPT_GET_WINDOWS_SHAREMODE: {
      unsigned long option_value;
      if (git_libgit2_opts(from_option, &option_value)) {
        return Nan::ThrowError("git_libgit2_opts failed");
      }
      to = Nan::New<Number>(option_value);
      break;
    }
    // GET ssize_t
    case GIT_OPT_GET_CACHED_MEMORY: {
      ssize_t option_value;
      if (git_libgit2_opts(from_option, &option_value)) {
        return Nan::ThrowError("git_libgit2_opts failed");
      }
      to = Nan::New<Number>(option_value);
      break;
    }
    // GET git_buf
    case GIT_OPT_GET_TEMPLATE_PATH:
    case GIT_OPT_GET_USER_AGENT: {
      git_buf option_value = { 0 };
      if (git_libgit2_opts(from_option, &option_value)) {
        return Nan::ThrowError("git_libgit2_opts failed");
      }
      to = Nan::New<v8::String>(option_value.ptr, option_value.size)
             .ToLocalChecked();
      git_buf_dispose(&option_value);
      break;
    }
    case GIT_OPT_GET_SEARCH_PATH: {
      git_buf option_value = { 0 };
      if (info.Length() < 2 || !info[1]->IsNumber()) {
        return Nan::ThrowError("Number option is required.");
      }
      const int level = (int)info[1].As<v8::Number>()->Value();
      if (git_libgit2_opts(from_option, level, &option_value)) {
        return Nan::ThrowError("git_libgit2_opts failed");
      }
      to = Nan::New<v8::String>(option_value.ptr, option_value.size)
             .ToLocalChecked();
      git_buf_dispose(&option_value);
      break;
    }
    // SET int
    case GIT_OPT_ENABLE_CACHING:
    case GIT_OPT_ENABLE_STRICT_OBJECT_CREATION:
    case GIT_OPT_ENABLE_STRICT_SYMBOLIC_REF_CREATION:
    case GIT_OPT_ENABLE_OFS_DELTA:
    case GIT_OPT_ENABLE_FSYNC_GITDIR:
    case GIT_OPT_ENABLE_STRICT_HASH_VERIFICATION:
    case GIT_OPT_ENABLE_UNSAVED_INDEX_SAFETY:
    case GIT_OPT_DISABLE_PACK_KEEP_FILE_CHECKS: {
      if (info.Length() < 2 || !info[1]->IsNumber()) {
        return Nan::ThrowError("Number option is required.");
      }
      const int option_arg = (int)info[1].As<v8::Number>()->Value();
      if (git_libgit2_opts(from_option, option_arg)) {
        return Nan::ThrowError("git_libgit2_opts failed");
      }
      break;
    }
    // SET bool
    case GIT_OPT_SET_WINDOWS_LONGPATHS: {
      int option_arg;
      if (info.Length() < 2) {
        option_arg = 0;
      } else {
        const Nan::Maybe<bool> maybeIsTruthy = Nan::To<bool>(info[1]);
        const bool isTruthy = maybeIsTruthy.IsJust() && maybeIsTruthy.FromJust();
        option_arg = isTruthy ? 1 : 0;
      }
      if (git_libgit2_opts(from_option, option_arg)) {
        return Nan::ThrowError("git_libgit2_opts failed");
      }
      break;
    }
    // SET size_t
    case GIT_OPT_SET_MWINDOW_SIZE:
    case GIT_OPT_SET_MWINDOW_MAPPED_LIMIT:
    case GIT_OPT_SET_PACK_MAX_OBJECTS: {
      if (info.Length() < 2 || !info[1]->IsNumber()) {
        return Nan::ThrowError("Number option is required.");
      }
      const size_t option_arg = (size_t)info[1].As<v8::Number>()->Value();
      if (git_libgit2_opts(from_option, option_arg)) {
        return Nan::ThrowError("git_libgit2_opts failed");
      }
      break;
    }
    default: {
      return Nan::ThrowError("Unsupported option");
    }
  }

  return info.GetReturnValue().Set(scope.Escape(to));
}

   
/*
   * @return Number  result    */
NAN_METHOD(GitLibgit2::Shutdown) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
    );

 int result =     git_libgit2_shutdown(
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
 * @param Number major
   * @param Number minor
   * @param Number rev
     */
NAN_METHOD(GitLibgit2::Version) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Number major is required.");
  }

  if (info.Length() == 1 || !info[1]->IsNumber()) {
    return Nan::ThrowError("Number minor is required.");
  }

  if (info.Length() == 2 || !info[2]->IsNumber()) {
    return Nan::ThrowError("Number rev is required.");
  }

// start convert_from_v8 block
  int * from_major = NULL;
      *from_major = (int)   info[0].As<v8::Number>()->Value();
// end convert_from_v8 block
// start convert_from_v8 block
  int * from_minor = NULL;
      *from_minor = (int)   info[1].As<v8::Number>()->Value();
// end convert_from_v8 block
// start convert_from_v8 block
  int * from_rev = NULL;
      *from_rev = (int)   info[2].As<v8::Number>()->Value();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              from_major
            ,
              from_minor
            ,
              from_rev
    );

    git_libgit2_version(
          from_major
,          from_minor
,          from_rev
    );

      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
     